import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const token = jwt.sign(
    { email, otp },
    SECRET,
    { expiresIn: "5m" }
  );

  return { otp, token };
}

export function verifyOTP(token, userOtp) {
  try {
    const decoded = jwt.verify(token, SECRET);

    if (decoded.otp !== userOtp) {
      return null;
    }

    return decoded.email;
  } catch (err) {
    return null;
  }
}