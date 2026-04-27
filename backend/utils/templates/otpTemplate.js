export const otpTemplate = (otp) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 400px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; color: #1a202c;">
    <h2 style="color: #2563eb; margin-top: 0;">Verification Code</h2>
    <p style="font-size: 16px; color: #4a5568;">Use the following OTP to complete your login. This code is valid for 5 minutes.</p>
    <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e293b;">${otp}</span>
    </div>
    <p style="font-size: 12px; color: #a0aec0;">If you did not request this code, please ignore this email.</p>
  </div>
`;