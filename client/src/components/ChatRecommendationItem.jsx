// ChatRecommendationItem.jsx
import React from 'react';
import { Flex, Avatar, Text, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const OnlineAvatar = ({ name, src, isOnline }) => (
  <Box position="relative">
    <Avatar size="md" name={name} src={src} />
    {isOnline && (
      <Box
        position="absolute"
        bottom="-1px"
        right="-1px"
        h={3}
        w={3}
        borderRadius="full"
        bgColor="green.500"
        border="2px solid white"
      />
    )}
  </Box>
);

const ChatRecommendationItem = ({ user }) => {
  const onlineUser = { ...user, isOnline: true };
  const navigate = useNavigate();
  const navigateToChat = () => {
    navigate('/chat', { state: { recipient: onlineUser } });
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      mb={2}
      py={2}
      borderRadius="2xl"
      bgColor="transparent"
      cursor="pointer"
      onClick={navigateToChat}
    >
      <Flex align="center">
        <OnlineAvatar
          name={onlineUser.username}
          src={onlineUser.avatarUrl}
          isOnline={onlineUser.isOnline}
        />
        <Flex direction="column">
          <Text fontWeight="500" fontSize="sm" ml={2}>
            {onlineUser.username}
          </Text>
          {onlineUser.isOnline && (
            <Text fontSize="xs" color="green.500" ml={2}>
              Online
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex>
        <Button
          background="transparent"
          p={2}
          color="blue.500"
          cursor="pointer"
          borderRadius="md"
          fontSize="sm"
          _hover={{ background: 'transparent' }}
        >
          Join
        </Button>
      </Flex>
    </Flex>
  );
}

export default ChatRecommendationItem;