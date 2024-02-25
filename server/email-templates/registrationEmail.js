export const registrationEmail = (name, otp) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1>Welcome to Socially!</h1>
    <p>Dear ${name},</p>
    <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
    <h3>Your OTP for verification is: ${otp}</h3>
    <p>Please use this OTP within the next 10 minutes.</p>
    <p>Best Regards,</p>
    <p>The Socially Team</p>
  </div>
`;