// RightBar.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import SuggestionItem from './SuggestionItem';

const RightBar = () => {
  const [scrollRightY, setScrollRightY] = useState(0);
  const myRef = useRef(null);

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
    return () => {};
  }, [scrollRightY]);

  return (
    <Box
      flex="3"
      position="sticky"
      top="0"
      height="calc(100vh - 60px)"
      overflow="scroll"
      bgColor="white"
      color="black"
      borderLeft="1px solid #dbdbdb" // Instagram's right bar has a border on the left
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
        {/* Instagram-like styling */}
        <Box boxShadow="sm" padding="16px" marginBottom="20px" bgColor="white">
          <Text fontWeight="bold" fontSize="18px" marginBottom="10px">
            Suggestions For You
          </Text>
          {[1, 2, 3, 4, 5].map((index) => (
            <SuggestionItem key={index} username={`Shyam ${index}`} />
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default RightBar;
