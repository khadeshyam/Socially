import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, Spinner } from '@chakra-ui/react';
import { makeRequest } from '../axios';
import Post from './Post';
import { useInView } from 'react-intersection-observer';

const Posts = ({ userId }) => {
  
  const fetchPosts = async ({ pageParam = 1 }) => {
    console.log('Fetching page', pageParam); // Log the page being fetched
    const res = await makeRequest.get(`/posts`, {
      params: { page: pageParam, userId },
    });
    return res.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['posts', userId], fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    console.log('InView:', inView);
    console.log('HasNextPage:', hasNextPage);
    console.log('Status:', status);
    if (inView && hasNextPage && status === 'success') {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, status]);

  console.log('Rendering Posts component:', data, error);

  return (
    <Box display="flex" flexDirection="column" gap="20px" height="100vh">
      {status === 'loading' ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={20}>
          <Spinner size="lg" color="brand.primary" />
        </Box>
      ) : (
        <>
          {data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((post) => (
                <Post post={post} key={post?.id} />
              ))}
            </React.Fragment>
          ))}
          <Box id="scroll-anchor" ref={ref} minHeight={10}/>
          {isFetchingNextPage && (
            <Box display="flex" justifyContent="center" alignItems="center" height={20}>
              <Spinner size="lg" color="brand.primary" />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Posts;
