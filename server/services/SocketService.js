import { Server } from 'socket.io';

class SocketService {
	constructor(server) {
		this.io = new Server(server, {
			cors: {
				origin: '*',
			},
		});
	}

	initSocketListeners() {
		this.io.on('connection', (socket) => {
			console.log('user connected');

			socket.on('event:message', (message) => {
				console.log(`message: ${JSON.stringify(message)}`);
				this.io.emit('event:message', message);
			});

			socket.on('disconnect', () => {
				console.log('user disconnected');
			});
		});
	}
}

export default SocketService;