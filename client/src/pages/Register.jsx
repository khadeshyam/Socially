import React, { useContext, useState } from 'react';
import { Box, Flex, Text, Input, Button, Divider, AbsoluteCenter, Spinner } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '../utils/axios';
import { AuthContext } from '../context/authContext';
import { useMutation } from '@tanstack/react-query';

function Register() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const { continueWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const registerMutation = useMutation((inputs) => makeRequest.post('/auth/register', inputs), {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.status === 200) {
        setInputs({ username: '', email: '', password: '', name: '' });
        navigate('/verify-email');
      }
    },
    onError: (err) => {
      const message = err.response?.data?.message || err?.message;
      setMsg({ type: 'error', title: message });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const continueWithGoogleMutation = useMutation(continueWithGoogle, {
    onMutate: () => {
      setIsGoogleLoading(true);
    },
    onSuccess: () => {
      setMsg({ type: 'success', title: 'Registration successful!' });
      navigate('/');
    },
    onError: (err) => {
      const message = err.response?.data?.message || err?.message;
      setMsg({ type: 'error', title: message });
    },
    onSettled: () => {
      setIsGoogleLoading(false);
    },
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
      setMsg({ type: 'error', title: 'Please fill all the fields' });
      return;
    }
    registerMutation.mutate(inputs);
  };

  return (
    <Box bgGradient="linear(to-r, #8253e0, #b542b3)">
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
          <Flex justifyContent="center" mb={4}>
            <Text fontSize="xl" fontWeight="bold">
              Socially
            </Text>
          </Flex>
          <Input
            placeholder="Username"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            name="username"
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            name="email"
            type="email"
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            type="password"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            name="password"
            onChange={handleChange}
          />
          <Input
            placeholder="Name"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            name="name"
            onChange={handleChange}
          />
          <Flex justifyContent="center" my="3">
            <Button
              variant="solid"
              borderRadius="lg"
              bgGradient="linear(to-r, #8253e0, #b542b3)"
              color="white"
              p={4}
              _hover={{ opacity: 0.8 }}
              onClick={handleClick}
              isLoading={isLoading}
              isDisabled={isLoading}
              loadingText={
                <Flex align="center">
                  Registering...
                </Flex>
              }
            >
              Register
            </Button>
          </Flex>
          <Box position="relative" my="4">
            <Divider borderColor="gray.500" height="10px" />
            <AbsoluteCenter bg="white" px="4">
              OR
            </AbsoluteCenter>
          </Box>
          <Flex justifyContent="center" my="3">
            <Button
              variant="outline"
              borderRadius="lg"
              borderColor="gray.300"
              p={4}
              mb={4}
              _hover={{ borderColor: '#8253e0', backgroundColor: '#e8d9f1' }}
              onClick={() => continueWithGoogleMutation.mutate()}
              disabled={isGoogleLoading} // Disable button when loading
              isLoading={isGoogleLoading} // Show loading indicator when loading
              loadingText="Logging In with Google ..."
            >
              <Link>
                Continue with Google
              </Link>
            </Button>
          </Flex>
          {msg && <Box textAlign="center" color={msg?.type === 'error' ? 'red' : 'green'}>
            {msg?.title}
          </Box>
          }
          <Flex justifyContent="space-between" mt={4}>
            <Text fontSize="sm" color="gray.500">
              <Link to="/forgot-password">Forgot password?</Link>
            </Text>
            <Text fontSize="sm" color="gray.500">
              <Link to="/login">Login</Link>
            </Text>
          </Flex>
        </Box>
      </Flex>


    </Box>
  );
}

export default Register;
