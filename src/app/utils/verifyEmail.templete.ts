const verifyEmailTemplate = ({ name, url }: { name: string; url: string }): string => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">Hello, ${name}!</h2>
        <p style="color: #555; line-height: 1.6;">
          Thank you for signing up! Please confirm your email address to activate your account.
        </p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="${url}" style="display: inline-block; padding: 12px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Verify Email
          </a>
        </p>
      </div>
    `;
  };
  
  export default verifyEmailTemplate;
  