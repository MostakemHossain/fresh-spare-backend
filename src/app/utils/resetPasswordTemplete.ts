const resetPasswordSuccessTemplate = ({ name }: { name: string }) => {
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
        <h1 style="color: #2c3e50; text-align: center;">Password Reset Successful</h1>
        <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #555;">Your password has been successfully reset. You can now log in with your new password.</p>
        <p style="font-size: 14px; color: #555;">If you did not request this change, please contact our support team immediately.</p>
        <p style="font-size: 14px; margin-top: 20px;">Thanks,</p>
        <p style="font-size: 14px; font-weight: bold;">The FreshSpare Team</p>
      </div>
    `;
};

export default resetPasswordSuccessTemplate;
