import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button, Divider, Spinner, AbsoluteCenter } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '../axios';

function VerifyMail() {

  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      await makeRequest.post('/auth/verify-gmail', { code: verificationCode });
      // Handle success and navigate accordingly
      //navigate('/success');
    } catch (err) {
      console.error(err); // Handle errors as needed
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
            Please enter the verification code sent to your Gmail account.
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
                  Verifying...
                  <Spinner ml={2} size="sm" color="white" />
                </Flex>
              }
            >
              Verify
            </Button>
          </Flex>
          <Box position="relative" my="4">
            <Divider borderColor="gray.500" height="10px" />
            <AbsoluteCenter bg="white" px="4">
              OR
            </AbsoluteCenter>
          </Box>
          <Flex justifyContent="center" my="3">
          </Flex>
          <Flex justifyContent="space-between" mt={4}>
            <Text fontSize="sm" color="gray.500">
              <Link to="/resend-code">Resend Verification Code</Link>
            </Text>
            <Text fontSize="sm" color="gray.500">
              <Link to="/logout">Logout</Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default VerifyMail;
