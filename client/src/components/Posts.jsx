import React from 'react';
import Post from './Post';
import { useQuery } from '@tanstack/react-query';
import { Box, Spinner } from '@chakra-ui/react';
import { makeRequest } from '../axios';

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      userId
        ? makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data)
        : makeRequest.get(`/posts`).then((res) => res.data),
  });

  return (
    <Box display="flex" flexDirection="column" gap="20px" height="100vh">
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={20} mt = {8}>
          <Spinner size="lg" color="brand.primary" />
        </Box>
      ) : (
        data?.map((post) => <Post post={post} key={post?.id} />)
      )}
    </Box>
  );
};

export default Posts;
