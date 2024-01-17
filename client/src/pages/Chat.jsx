import React, { useState, useEffect } from 'react';
import { Box, Input, VStack, Text, IconButton, FormControl, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import useSocket from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';

const Chat = () => {
	const { currentUser } = useAuth();
	const { sendMessage, messages } = useSocket();
	const location = useLocation();
	const recipient = location.state?.recipient;
	const [newMessage, setNewMessage] = useState('');
	const [sortedMessages, setSortedMessages] = useState([]);

	useEffect(() => {
		const combinedMessages = [...(messages[currentUser.id] || []), ...(messages[recipient.id] || [])];
		combinedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
		setSortedMessages(combinedMessages);
	}, [messages, currentUser.id, recipient.id]);

	const handleSend = (event) => {
		event.preventDefault();
		if (newMessage.trim() === '') {
			return;
		}
		const message = {
			text: newMessage,
			senderId: currentUser?.id,
			recipientId: recipient?.id,
			timestamp: new Date().toISOString(),
		};
		sendMessage(message);
		setNewMessage('');
	};

	return (
		<Box p={4} display="flex" flexDirection="column" height="100vh">
			<Flex alignItems="center" mb={4}>
				<Text fontSize="xl" fontWeight="bold" flex="1">
					{recipient.username}
				</Text>
				<IconButton icon={<CallIcon />} aria-label="Audio call" />
				<IconButton ml={2} icon={<VideoCallIcon />} aria-label="Video call" />
			</Flex>
			<VStack spacing={4} align="stretch" overflowY="auto" flex="1">
				{sortedMessages.map((message) => (
					<Box
						key={message.id}
						alignSelf={message.senderId === currentUser.id ? 'flex-end' : 'flex-start'}
					>
						<Text
							fontSize="md"
							p={2}
							borderRadius="md"
							bg={message.senderId === currentUser.id ? 'purple.500' : 'gray.200'}
							color={message.senderId === currentUser.id ? 'white' : 'black'}
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
						background: 'gray.200',
					}}
				/>
				<IconButton
					colorScheme="purple"
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