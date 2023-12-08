// SuggestionItem.js
import React, { useState } from 'react';
import { Flex, Image, Text, Button } from '@chakra-ui/react';

const SuggestionItem = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      marginBottom="8px"
      padding="10px"
      borderRadius="8px"
      bgColor="transparent"
    >
      <Flex align="center">
        <Image
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          borderRadius="50%"
          boxSize="30px"
          objectFit="cover"
          marginRight="10px"
        />
        <Text fontWeight="500" fontSize="14px">
          {username}
        </Text>
      </Flex>
      <Flex>
        <Button
          background="transparent"
          padding="8px 12px"
          color={isFollowing ? '#ed4956':'#0095f6'}
          cursor="pointer"
          borderRadius="4px"
          fontSize="12px"
          _hover={{ background: 'transparent' }}
          onClick={handleFollowToggle}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default SuggestionItem;
