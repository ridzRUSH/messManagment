export const billTemplate = (data) => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f7f6; padding: 20px;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
      <tr>
        <td align="center" style="padding: 30px; background-color: #2563eb; color: #ffffff;">
          <h2 style="margin: 0; font-size: 22px;">Monthly Mess Statement</h2>
          <p style="margin: 5px 0 0; opacity: 0.8;">${data.month} ${data.year}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px;">
          <p style="margin-top: 0;">Dear <strong>${data.studentName}</strong>,</p>
          <table width="100%" style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
            <tr><td style="color: #718096;">Student ID:</td><td align="right"><strong>${data.studentId}</strong></td></tr>
          </table>
          <table width="100%" style="background-color: #f8fafc; padding: 15px; border-radius: 10px;">
            <tr>
              <td style="font-weight: bold; color: #1e3a8a;">Total Due:</td>
              <td align="right" style="font-size: 20px; font-weight: 900; color: #2563eb;">₹${data.totalAmount}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0 30px 30px;">
          <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Pay via Razorpay</a>
        </td>
      </tr>
    </table>
  </div>
`;