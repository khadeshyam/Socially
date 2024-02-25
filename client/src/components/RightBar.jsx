import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import SuggestionItem from './SuggestionItem';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../utils/axios';


const RightBar = () => {
  const [scrollRightY, setScrollRightY] = useState(0);
  const myRef = useRef(null);
  
  const fetchRecommendedUsers = async () => {
    const res = await makeRequest.get('users/recommended');
    return res.data;
  };

  const { data: recommendedUsers, isLoading, error } = useQuery({
    queryKey: ['recommendedUsers'],
    queryFn: fetchRecommendedUsers
  });

  useEffect(() => {
    const node = myRef?.current;

    const handleScroll = () => {
      setScrollRightY(node.scrollTop);
    };

    node?.addEventListener('scroll', handleScroll);

    return () => {
      node?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const node = myRef?.current;
    if (node) {
      node.scrollTop = scrollRightY;
    }
    return () => { };
  }, [scrollRightY]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={20}>
        <Spinner size="lg" color="brand.primary" />
      </Box>
    );
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box
      flex="3"
      position="sticky"
      top="0"
      height="calc(100vh - 60px)"
      overflow="scroll"
      bgColor="white"
      color="black"
      borderLeft="1px solid #dcdcdc" // Instagram's right bar has a border on the left
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '@media (max-width: 767px)': {
          display: 'none',
        },
      }}
      ref={myRef}
    >
      <Flex direction="column" padding="16px">
        <Box boxShadow="sm" padding="16px" marginBottom="20px" bgColor="white">
          <Text fontWeight="bold" fontSize="18px" marginBottom="10px">
            Suggestions For You
          </Text>
          {recommendedUsers.map((user, index) => (
            <SuggestionItem key={index} username={user.username} avatarUrl={user.profilePic} userId={user.id}/>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default RightBar;