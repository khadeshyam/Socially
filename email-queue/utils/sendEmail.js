import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const sendEmail = (to, subject, text = '',html = '') => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: to,
		subject: subject,
		text: text,
		html: html
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			} else {
				resolve(info);
			}
		});
	});
};

export default sendEmail;