import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
	const [socket, setSocket] = useState(null);

	const sendMessage = useCallback((msg) => {
		console.log('send message', msg);
		if (socket) {
			socket.emit('event:message', JSON.stringify({ message: msg }));
		}
	}, [socket]);

	const onMessageRecvd = useCallback((msg) => {
		const { message } = JSON.parse(msg);
		console.log('message received', message);
		console.log('message received', msg);
	}, []);

	// Effect to create the socket connection and set up the message listener
	useEffect(() => {
		const _socket = io(process.env.REACT_APP_SOCKET_URL);
		_socket.on('event:message', onMessageRecvd);
		setSocket(_socket);

		// Cleanup function to disconnect the socket and remove the message listener
		return () => {
			_socket.disconnect();
			_socket.off('event:message', onMessageRecvd);
			setSocket(null);
		};
	}, []);

	return { sendMessage };
};

export default useSocket;