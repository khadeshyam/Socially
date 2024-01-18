import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../utils/axios';
import ChatRecommendationItem from './ChatRecommendationItem';

const ChatRecommendations = () => {
	const fetchRecommendedUsers = async () => {
		const res = await makeRequest.get('users/recommended');
		return res.data;
	};

	const { data: recommendedUsers, isLoading, error } = useQuery({
		queryKey: ['recommendedUsers'],
		queryFn: fetchRecommendedUsers
	});

	return (
		<Box p={5}>
			<Text fontSize="xl" fontWeight="bold" textAlign="center">Chat Recommendations</Text>
			{recommendedUsers?.map((user) => (
				<ChatRecommendationItem key={user.id} user={user} />
			))}
		</Box>
	);
};

export default ChatRecommendations;
