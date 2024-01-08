import { Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const TruncatedText = ({ text, postId, wordLimit }) => {

  const truncateText = (text, wordLimit) => {
	if(!text) return ''
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '... ';
    }
    return text;
  };

  return (
    <Text mt={4} mb={4}>
      {truncateText(text, wordLimit)}
      {text?.split(' ').length > wordLimit && (
        <Text color="gray.500" display="inline">
          <RouterLink to={`/post/${postId}`}>
            Read more
          </RouterLink>
        </Text>
      )}
    </Text>
  );
};

export default TruncatedText;