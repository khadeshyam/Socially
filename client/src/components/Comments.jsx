import { useContext, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AuthContext } from "../context/authContext";
import { makeRequest } from '../utils/axios';
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState('');

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () => makeRequest.get('/comments?postId=' + postId).then((res) => {
      return res.data;
    })
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((newComment) => {
    return makeRequest.post('/comments', newComment)
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
      },
    }
  );

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('black', 'white');
  const textColorSoft = useColorModeValue('gray.600', 'gray.400');
  const buttonColor = useColorModeValue('#5271ff', '#316dca');

  const handleClick = (e) => {
    try {
      const res = mutation.mutate({ desc, postId });
      console.log(res);
      setDesc('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box className="comments">
      <Flex className="write" alignItems="center" justifyContent="space-between" gap={4} margin="20px 0px">
        <Image src={currentUser?.profilePic} alt="" boxSize="40px" borderRadius="50%" fit="cover" />
        <Input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          flex={5}
          padding="10px"
          border={`1px solid ${borderColor}`}
          backgroundColor="transparent"
          color={textColor}
        />
        <Button
          onClick={handleClick}
          border="none"
          backgroundColor={buttonColor}
          color="white"
          padding="10px"
          cursor="pointer"
          borderRadius="3px"
        >
          Send
        </Button>
      </Flex>

      {isLoading
        ? "Loading"
        : data?.map((comment) => (
          <Flex className="comment" key={comment?.id} justifyContent="space-between" gap={4} margin="30px 0px" backgroundColor={bgColor} border={`1px solid ${borderColor}`} borderRadius="4px">
            <Image src={comment?.userProfilePic} alt="" boxSize="40px" borderRadius="50%" fit="cover" />
            <Box className="info" flex={5} display="flex" flexDirection="column" gap={3} alignItems="flex-start">
              <Text fontWeight="500">{comment?.userName}</Text>
              <Text color={textColorSoft}>{comment?.desc}</Text>
            </Box>
            <Text className="date" flex={1} alignSelf="center" color="gray" fontSize="12px">
              {moment(comment?.createdAt).fromNow()}
            </Text>
          </Flex>
        ))}
    </Box>
  );
};

export default Comments;
