const forgotPasswordTemplate = ({
  name,
  otp,
}: {
  name: string;
  otp: number | string;
}) => {
  return `
    <div style="
      font-family: Arial, sans-serif; 
      color: #333; 
      background-color: #f9f9f9; 
      padding: 20px; 
      border: 1px solid #ddd; 
      border-radius: 8px; 
      max-width: 400px; 
      margin: auto;
    ">
      <h1 style="color: #2c3e50; text-align: center;">Forgot Password</h1>
      <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 14px; color: #555;">We have sent you a one-time password (OTP) to reset your password.</p>
      <p style="
        font-size: 18px; 
        font-weight: bold; 
        color: #e74c3c; 
        text-align: center; 
        background-color: #fdf2f2; 
        padding: 10px; 
        border-radius: 4px; 
        margin: 10px 0;
      ">
        OTP: ${otp}
      </p>
      <p style="font-size: 14px; color: #555;">This OTP is valid for 1 hour only.</p>
      <p style="font-size: 14px; color: #555;">Click on the link below to reset your password.</p>
      <p style="font-size: 14px; margin-top: 20px;">Thanks,</p>
      <p style="font-size: 14px; font-weight: bold;">The FreshSpare Team</p>
    </div>
    `;
};

export default forgotPasswordTemplate;
