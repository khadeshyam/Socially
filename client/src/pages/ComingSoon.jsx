import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ComingSoon() {
  return (
    <Box bgGradient="linear(to-r, #8253e0, #b542b3)" height="100vh">
      <Flex alignItems="center" justifyContent="center" height="100%">
        <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
          <Flex justifyContent="center" mb={4}>
            <Text fontSize="xl" fontWeight="bold">
              Socially
            </Text>
          </Flex>
          <Text fontSize="2xl" mb={4} textAlign="center">
            Feature Coming Soon
          </Text>
          <Text textAlign="center" color="gray.500">
            We are working on exciting new features for you. Stay tuned!
          </Text>
          <Flex justifyContent="center" my="4">
            <Button
              as={Link}
              to="/"
              variant="solid"
              borderRadius="lg"
              bgGradient="linear(to-r, #8253e0, #b542b3)"
              color="white"
              p={4}
              _hover={{ opacity: 0.8 }}
            >
              Go back to Home
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ComingSoon;
