import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Box, Text, Flex, FormControl, FormLabel, Link as ChakraLink, useToast } from '@chakra-ui/react';
import { makeRequest } from '../../axios';

function Register() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false); // Flag to track toast state
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = 'register-toast'; // Unique ID for the toast

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
        throw new Error('Please fill all the fields');
      }
      await makeRequest.post('/auth/register', inputs);
      setInputs({ username: '', email: '', password: '', name: '' });
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.message || err?.message;
      setMsg(message);
      if (!isToastOpen) {
        setIsToastOpen(true); // Set the flag to true when showing toast
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: 'Error',
            description: message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
            onCloseComplete: () => setIsToastOpen(false), // Clear the flag when toast is closed
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bgGradient="linear(to-r, #4facfe, #00f2fe)">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
        <Flex direction="column" align="center">
          <Text fontSize="2xl" mb={4} textAlign="center">
            Register
          </Text>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Username" name="username" onChange={handleChange} />
          </FormControl>
          <FormControl mt={2} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
          </FormControl>
          <FormControl mt={2} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
          </FormControl>
          <FormControl mt={2} isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Name" name="name" onChange={handleChange} />
          </FormControl>
          <Box mt={4} textAlign="center">
            <Button
              colorScheme="teal"
              onClick={handleClick}
              isLoading={isLoading}
              loadingText="Registering..."
              mx="auto"
              display="block"
            >
              Register
            </Button>
          </Box>
          <Box mt={4} textAlign="center">
            <Text>
              Have an account?{' '}
              <ChakraLink as={Link} to="/login" color="teal.500">
                Login
              </ChakraLink>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Register;
