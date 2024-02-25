import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button, Divider } from '@chakra-ui/react';
import { makeRequest } from '../utils/axios';
import { useMutation } from '@tanstack/react-query'

function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);

	const forgotPasswordMutation = useMutation((email) => makeRequest.post('/auth/forgot-password', { email }), {
		onSuccess: (res) => {
			//console.log(res);
			setMessage({type:'success',text:res?.data?.message});
			setIsLoading(false);
		},
		onError: (err) => {
			console.log(err);
			setMessage({type:'error',text:err?.response?.data?.message});
			setIsLoading(false);
		},
	});

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleClick = () => {
		setIsLoading(true);
		forgotPasswordMutation.mutate(email);
	};

	return (
		<Box bgGradient="linear(to-r, #8253e0, #b542b3)">
			<Flex h="100vh" alignItems="center" justifyContent="center">
				<Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
					<Flex justifyContent="center" mb={4}>
						<Text fontSize="xl" fontWeight="bold">
							Forgot Password
						</Text>
					</Flex>
					<Text mb={4} textAlign="center">
						Please enter your email to reset your password.
					</Text>
					<Input
						placeholder="Email"
						borderRadius="lg"
						borderWidth={1}
						borderColor="gray.300"
						p={4}
						mb={3}
						value={email}
						onChange={handleEmailChange}
					/>
					<Flex mt={2} alignItems="center" justifyContent="space-between">
						<Text textAlign="center">
							A link will be sent to your	email
						</Text>
						<Button
							variant="solid"
							borderRadius="lg"
							bgGradient="linear(to-r, #8253e0, #b542b3)"
							color="white"
							p={4}
							_hover={{ opacity: 1 }}
							onClick={handleClick}
							isLoading={isLoading}
							isDisabled={!email || isLoading}
						>
							Send Link
						</Button>
					</Flex>
					{message?.text && (
						<Box>
							<Text mt={3} color={message.type == 'error'?'red.600':'green.600'} textAlign="center">
								{message?.text}
							</Text>
						</Box>
					)
					}
				</Box>
			</Flex>
		</Box>
	);
}

export default ForgotPassword;