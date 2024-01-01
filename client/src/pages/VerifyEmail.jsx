import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button, Divider, Spinner, AbsoluteCenter } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '../utils/axios';

function VerifyMail() {

  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null); // Add this line
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!verificationCode) {
        throw new Error('Please enter the verification code');
      }
      // Make a request to verify the code
      const res = await makeRequest.post('/auth/verify-email', { otp: verificationCode });
      // Handle success and navigate accordingly
      res.status === 200 && navigate('/login');
    } catch (err) {
      console.error(err.message); // Handle errors as needed
      if (err.response && err.response.status === 401) {
        setMsg({ type: 'error', title: err.response.data.message });
      } else {
        setMsg({ type: 'error', title: err.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bgGradient="linear(to-r, #8253e0, #b542b3)">
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
          <Flex justifyContent="center" mb={4}>
            <Text fontSize="xl" fontWeight="bold">
              Email Verification
            </Text>
          </Flex>
          <Text mb={4} textAlign="center">
            Please enter the verification code sent to your Email account.
          </Text>
          <Input
            placeholder="Verification Code"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300"
            p={4}
            mb={3}
            value={verificationCode}
            onChange={handleChange}
          />
          <Flex mt={4} alignItems="center" justifyContent="space-between">
            <Text fontSize="sm" color="gray.500">
              <Link to="/resend-code">Resend code</Link>
            </Text>
            <Flex my="3">
              <Button
                variant="solid"
                borderRadius="lg"
                bgGradient="linear(to-r, #8253e0, #b542b3)"
                color="white"
                p={4}
                _hover={{ opacity: 0.8 }}
                onClick={handleClick}
                isLoading={isLoading}
                isDisabled={!verificationCode || isLoading}
                loadingText={
                  <Flex align="center">
                    Verifying...
                  </Flex>
                }
              >
                Verify
              </Button>
            </Flex>
          </Flex>
          <Divider />
          {msg && (
                <Box textAlign="center" color={msg?.type === 'error' ? 'red' : 'green'} mt={2}>
                  {msg?.title}
                </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default VerifyMail;
