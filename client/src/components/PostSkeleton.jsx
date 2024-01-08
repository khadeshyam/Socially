import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const PostSkeleton = () => {
  return (
    <Box borderRadius="lg" border="1px solid #dcdcdc" bgColor="white" color="black" margin="20px" padding="20px">
      <Flex align="center" justify="space-between" p="4">
        <Flex align="center">
          <SkeletonCircle size="10" />
          <Box ml="4">
            <Skeleton height="20px" width="100px" />
            <Skeleton height="10px" width="60px" mt="2" />
          </Box>
        </Flex>
        <Skeleton height="20px" width="20px" />
      </Flex>
      <Box p="4">
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <Box display="flex" justifyContent="center" alignItems="center" p="2" m="2" width="100%">
          <Skeleton height="200px" width="100%" />
        </Box>
      </Box>
      <Flex justifyContent="flex-start" p="4" gap="10">
        <Skeleton height="20px" width="20px" />
        <Skeleton height="20px" width="20px" />
        <Skeleton height="20px" width="20px" />
      </Flex>
      <Flex justifyContent="flex-start" p="4">
        <Skeleton height="20px" width="100px" />
      </Flex>
    </Box>
  );
};

export default PostSkeleton;