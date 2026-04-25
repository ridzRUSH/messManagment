import queries from "../db/user.query.js";
import { pool } from "../index.js";
import { generateOTP, verifyOTP } from "../utils/otp.js";
import { sendOTP } from "../utils/mailer.js";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET || "authsecret";


async function findUserByRole(email, role) {
  if (role === "STUDENT") {
    const [rows] = await pool.query(
      queries.getStudentByEmail,
      [email]
    );

    if (rows.length > 0) {
      return {
        user: rows[0],
        role: "STUDENT",
        id: rows[0].student_id
      };
    }
  } else {
    const [rows] = await pool.query(
      queries.getStaffByEmail,
      [email]
    );

    if (rows.length > 0 && rows[0].role === role) {
      return {
        user: rows[0],
        role: rows[0].role,
        id: rows[0].staff_id
      };
    }
  }

  return null;
}


async function sendOtp(req, res) {
  const { email, role } = req.body;

  try {
    const result = await findUserByRole(email, role);

    if (!result) {
      return res.status(404).json({
        error: "User not found with specified role"
      });
    }

    const { otp, token } = generateOTP(email);

    await sendOTP(email, otp);

    return res.json({
      message: "OTP sent",
      token,
      role 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to send OTP"
    });
  }
}



async function verifyOtp(req, res) {
  const { otp, token, role } = req.body;

  try {
    const email = verifyOTP(token, otp);

    if (!email) {
      return res.status(401).json({
        error: "Invalid or expired OTP"
      });
    }

    const result = await findUserByRole(email, role);

    if (!result) {
      return res.status(404).json({
        error: "User not found with specified role"
      });
    }

    const { user, id } = result;

    const authToken = jwt.sign(
      {
        id,
        email: user.email,
        role
      },
      AUTH_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", authToken, {
        httpOnly: true,         
        secure: false,           
        sameSite: "lax",        
        maxAge: 24 * 60 * 60 * 1000 
    });


    return res.json({
      message: "Login successful",
      token: authToken,
      role,
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "OTP verification failed"
    });
  }
}


const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export {
  sendOtp,
  verifyOtp,
    logout
};