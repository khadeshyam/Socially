import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { useAuth } from './useAuth';

const useSocket = () => {
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState({});
	const { currentUser:{id:userId} } = useAuth();
	console.log('userId', userId);

	const sendMessage = useCallback((msg) => {
		console.log('send message', msg);
		if (socket) {
			socket.emit('event:message', JSON.stringify(msg));
		}
	}, [socket]);

	const onMessageRecvd = useCallback((msg) => {
		console.log('message received', JSON.parse(msg));
		setMessages((messages) => {
			const message = JSON.parse(msg);
			const { senderId } = message;
			return {
				...messages,
				[senderId]: [...(messages[senderId] || []), message],
			};
		});
	}, []);

	// Effect to create the socket connection and set up the message listener
	useEffect(() => {
		const _socket = io(process.env.REACT_APP_SOCKET_URL);
		_socket.on('event:message', onMessageRecvd);
		_socket.emit('event:join',userId);
		setSocket(_socket);

		// Cleanup function to disconnect the socket and remove the message listener
		return () => {
			_socket.disconnect();
			_socket.off('event:message', onMessageRecvd);
			setSocket(null);
		};
	}, [userId, onMessageRecvd]);

	return { sendMessage, setMessages, messages };
};

export default useSocket;