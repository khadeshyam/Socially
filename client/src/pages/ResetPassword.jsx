import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button } from '@chakra-ui/react';
import { useNavigate,useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '../utils/axios';


const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  console.log('params',params);

  const resetPasswordMutation = useMutation((inputs) => makeRequest.post('/auth/reset-password', inputs), {
    onSuccess: (data) => {
      setMessage(data.message);
      navigate('/login');
    },
    onError: () => {
      setMessage('An error occurred');
    },
  });

  const resetPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    resetPasswordMutation.mutate({ token: params.token, newPassword: password });
  };

  return (
    <Box bgGradient="linear(to-r, #8253e0, #b542b3)">
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
          <Flex justifyContent="center" mb={4}>
            <Text fontSize="xl" fontWeight="bold">
              Reset Password
            </Text>
          </Flex>
          <Text mb={4} textAlign="center">
            Please enter your new password.
          </Text>
          <Input
            type="password"
            placeholder="New password"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Flex mt={4} alignItems="center" justifyContent="flex-end">
            <Button
              variant="solid"
              borderRadius="lg"
              bgGradient="linear(to-r, #8253e0, #b542b3)"
              color="white"
              p={4}
              _hover={{ opacity: 1 }}
              onClick={resetPassword}
            >
              Reset
            </Button>
          </Flex>
          {message && <Text mt={3} color="red.500">{message}</Text>}
        </Box>
      </Flex>
    </Box>
  );
};

export default ResetPassword;