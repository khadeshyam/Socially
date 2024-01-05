import React, { useState } from 'react';
import { Flex, Image, Text, Button } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../utils/axios';

const SuggestionItem = ({ username, avatarUrl,userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const queryClient = useQueryClient();
  console.log('suggestion Item')

  const followUnfollowMutation = useMutation(
    (follow) => {
      if (follow) {
        return makeRequest.get(`/relationships`, { followedUserId: userId });
      } else {
        return makeRequest.delete(`/relationships`, { followedUserId: userId });
      }
    },
    {
      onMutate: (follow) => {
        setIsFollowing(follow);
      },
      onError: (err, follow) => {
        setIsFollowing(!follow);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('relationships');
      },
    }
  );

  const handleFollowToggle = () => {
    followUnfollowMutation.mutate(!isFollowing);
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
          src={avatarUrl}
          alt={username}
          borderRadius="50%"
          boxSize="30px"
          fit="cover"
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
