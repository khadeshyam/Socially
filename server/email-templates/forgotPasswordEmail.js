export const forgotPasswordEmail = (resetLink) => `
	<div style="font-family: Arial, sans-serif; color: #333;">
		<h1>Password Reset Request</h1>
		<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
		<p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
		<a href="${resetLink}">Reset password</a>
		<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
		<p>Best Regards,</p>
		<p>The Socially Team</p>
	</div>
`;