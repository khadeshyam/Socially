import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const SuggestionItemSkeleton = () => {
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
        <SkeletonCircle size="8" />
        <Box ml="4">
          <Skeleton height="10px" width="100px" />
        </Box>
      </Flex>
      <Flex>
        <Skeleton height="20px" width="60px" />
      </Flex>
    </Flex>
  );
};

export default SuggestionItemSkeleton;