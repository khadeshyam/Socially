import { Worker } from 'bullmq';
import emailQueue from './utils/emailQueue.js'; 
import sendEmail from './utils/sendEmail.js';
console.log( emailQueue.opts);


const worker = new Worker(emailQueue.name, async job => {
	const { to, subject, text, html } = job.data;
	await sendEmail(to, subject, text, html);
}, {
	connection: emailQueue.opts.connection,
	concurrency: 100
});

worker.on('ready', () => {
	console.log('[email-queue] : Connected to Redis');
});

worker.on('completed', (job) => {
	console.log(`[email-queue] : Email job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
	console.log(`[email-queue] : Email job ${job.id} failed: ${err.message}`);
});