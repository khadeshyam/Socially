import React, { useContext, useState } from 'react';
import { Box, Flex, Text, Input, Button, Divider, AbsoluteCenter } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useMutation } from '@tanstack/react-query';

function Login() {
  const { loggin, continueWithGoogle } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const loginMutation = useMutation(loggin, {
    onSuccess: () => {
      setMsg({ type: 'success', title: 'Login successful!' });
      navigate('/');
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
    onSuccess: () => {
      setMsg({ type: 'success', title: 'Login successful!' });
      navigate('/');
    },
    onError: (err) => {
      const message = err.response?.data?.message || err?.message;
      setMsg({ type: 'error', title: message });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });



  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputs.usernameOrEmail || !inputs.password) {
      setMsg({ type: 'error', title: 'Fill in all the fields' });
      return;
    }
    setIsLoading(true);
    loginMutation.mutate(inputs);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            placeholder="Username, or email"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            name="usernameOrEmail"
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            type="password"
            name="password"
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
              onClick={handleLogin}
              isLoading={isLoading}
              loadingText="Logging In"
            >
              Log in
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
            >
              <Link >Continue with Google</Link>
            </Button>
          </Flex>
          {msg && <Box textAlign="center" color={msg?.type === 'error' ? 'red' : 'green'} mt={2}>
            {msg?.title}
          </Box>
          }
          <Flex justifyContent="space-between" mt={4}>
            <Text fontSize="sm" color="gray.500">
              <Link to="/forgot-password">Forgot password?</Link>
            </Text>
            <Text fontSize="sm" color="gray.500">
              <Link to="/register">Register</Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Login;
