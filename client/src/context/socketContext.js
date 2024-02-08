import React, { createContext, useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState({});
	const { currentUser } = useAuth();
	const userId = currentUser ? currentUser.id : null;

	const sendMessage = useCallback((msg) => {
		if (socket) {
			socket.emit('event:message', JSON.stringify(msg));
		}
	}, [socket]);

	const onMessageRecvd = useCallback((msg) => {
		setMessages((messages) => {
			const message = JSON.parse(msg);
			const { senderId } = message;
			console.log('recieved message', message);
			return {
				...messages,
				[senderId]: [...(messages[senderId] || []), message],
			};
		});
	}, []);

	useEffect(() => {
		const _socket = io(process.env.REACT_APP_SOCKET_URL);
		_socket.on('event:message', onMessageRecvd);
		_socket.emit('event:join',userId);
		setSocket(_socket);

		return () => {
			_socket.disconnect();
			_socket.off('event:message', onMessageRecvd);
			setSocket(null);
		};
	}, [userId, onMessageRecvd]);

	return (
		<SocketContext.Provider value={{ socket, messages, sendMessage }}>
			{children}
		</SocketContext.Provider>
	);
};