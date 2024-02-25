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

			socket.on('event:join', (userId) => {
				console.log(`user ${userId} joined`);
				socket.join(userId);
			});

			socket.on('event:message', (message) => {
				const msg = JSON.parse(message);
				this.io.to([msg.senderId,msg.recipientId]).emit('event:message', message);
				//save the message to the database
			});

			socket.on('disconnect', () => {
				console.log('user disconnected');
			});
		});
	}
}

export default SocketService;