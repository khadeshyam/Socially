import dotenv from 'dotenv';
dotenv.config();
import { Queue } from 'bullmq';

const connectionOpts = {
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	username: process.env.REDIS_USER,
	password: process.env.REDIS_PASSWORD
};

const emailQueue = new Queue('email-queue', { connection: connectionOpts });

export default emailQueue;