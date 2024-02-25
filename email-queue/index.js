import http from 'http';
import { Worker } from 'bullmq';
import emailQueue from './utils/emailQueue.js'; 
import sendEmail from './utils/sendEmail.js';

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

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Email queue is up and running\n');
});

server.listen(3001, () => {
	console.log('Server running on port 3001');
});