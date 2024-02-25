import dotenv from 'dotenv';
import http from 'http';
import SocketService from './utils/SocketService.js';

dotenv.config();

const PORT = process.env.SOCKET_PORT || 6001;
const server = http.createServer();

server.listen(PORT, () => {
	console.log(`[socket-service] : Socket service is listening on port ${PORT}`);
	const socketService = new SocketService(server);
	socketService.initSocketListeners();
});