import React, { useState } from 'react';
import { Box, Input, VStack, Text, IconButton, FormControl, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import useSocket from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';

const initialMessages = [
	{ id: 1, text: 'Hello!', sender: 'me' },
	{ id: 2, text: 'Hi, how are you?', sender: 'other' },
	// Add more messages here
];

const Chat = () => {

	const {sendMessage,onMessageRecvd} = useSocket();
	const { currentUser } = useAuth();

	const location = useLocation();
	const recipient = location.state?.recipient;
	const [messages, setMessages] = useState(initialMessages);
	const [newMessage, setNewMessage] = useState('');

	const handleSend = (event) => {
		event.preventDefault();
		if (newMessage.trim() === '') {
			return;
		}
		const message = {
			id: messages.length + 1,
			text: newMessage,
			senderId: currentUser?.id, // replace with the authenticated user's id
			recipientId: recipient?.id, // replace with the selected user's id
		};
		sendMessage(message);
		setMessages([...messages, message]);
		setNewMessage('');
	};

	return (
		<Box p={4} display="flex" flexDirection="column" height="100vh">
			<Flex alignItems="center" mb={4}>
				<Text fontSize="xl" fontWeight="bold" flex="1">
					{recipient.name}
				</Text>
				<IconButton icon={<CallIcon />} aria-label="Audio call" />
				<IconButton ml={2} icon={<VideoCallIcon />} aria-label="Video call" />
			</Flex>
			<VStack spacing={4} align="stretch" overflowY="auto" flex="1">
				{messages.map((message) => (
					<Box
						key={message.id}
						alignSelf={message.sender === 'me' ? 'flex-end' : 'flex-start'}
					>
						<Text
							fontSize="md"
							p={2}
							borderRadius="md"
							bg={message.sender === 'me' ? 'blue.500' : 'gray.200'}
							color={message.sender === 'me' ? 'white' : 'black'}
						>
							{message.text}
						</Text>
					</Box>
				))}
			</VStack>
			<FormControl as="form" mt={4} display="flex" alignItems="center" onSubmit={handleSend}>
				<Input
					placeholder="Type a message"
					variant="filled"
					mr={2}
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					_focus={{
						boxShadow: '0 0 0 1px #bee3f8', // This color corresponds to blue.200
					}}
				/>
				<IconButton
					colorScheme="blue"
					type="submit"
					icon={<SendIcon />}
					aria-label="Send message"
					isDisabled={newMessage.trim() === ''}
				/>
			</FormControl>
		</Box>
	);
}

export default Chat;