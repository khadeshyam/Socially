import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';

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
      className="rightbar"
      flex="3"
      position="sticky"
      top="60px"
      height="calc(100vh - 60px)"
      overflow="scroll"
      bgColor="gray.100"
      color="gray.800"
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
        <Box boxShadow="lg" padding="16px" marginBottom="20px" bgColor="gray.200">
          <Text color="gray">Suggestions For You</Text>
          <Flex align="center" justify="space-between" margin="20px 0">
            <Flex align="center">
              <Image
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt=""
                borderRadius="50%"
                boxSize="30px" // Adjusted image size
                objectFit="cover"
              />
              <Text fontWeight="500" marginLeft="20px">
                Shyam
              </Text>
            </Flex>
            <Flex>
              <Button backgroundColor="#5271ff" padding="5px" color="white" cursor="pointer">
                Follow
              </Button>
              <Button backgroundColor="#f0544f" padding="5px" color="white" cursor="pointer">
                Dismiss
              </Button>
            </Flex>
          </Flex>

        </Box>
       
      </Flex>
    </Box>
  );
};

export default RightBar;
