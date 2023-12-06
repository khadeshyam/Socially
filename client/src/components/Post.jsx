import {
  Box,
  Flex,
  Text,
  IconButton,
  Image,
  Button,
} from '@chakra-ui/react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import Comments from './Comments';

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () =>
      makeRequest.get('/likes?postId=' + post.id).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete('/likes?postId=' + post.id);
      return makeRequest.post('/likes', { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('likes');
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete(`/posts/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts', 'user']);
        queryClient.refetchQueries();
      },
    }
  );

  const handleLike = async () => {
    mutation.mutate(data?.includes(currentUser?.id));
  };

  const handleDelete = async () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <Box boxShadow="lg" borderRadius="lg" bgColor="gray.100" color="gray.800">
      <Flex align="center" justify="space-between" p="4">
        <Flex align="center">
          <Image
            src={post.userProfilePic}
            borderRadius="full"
            boxSize="40px"
            objectFit="cover"
            mr="4"
          />
          <Box>
            <Link to={{ pathname: `/profile/${post.userId}` }}>
              <Text fontWeight="500">{post.userName}</Text>
            </Link>
            <Text fontSize="sm" color="gray.500">
              {moment(post.createdAt).fromNow()}
            </Text>
          </Box>
        </Flex>
        <IconButton
          icon={<MoreHorizIcon />}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && post.userId === currentUser?.id && (
          <Button onClick={handleDelete}>Delete</Button>
        )}
      </Flex>
      <Box p="4">
        <Text>{post.desc}</Text>
        <Box className="wireframe">
          <LazyLoadImage
            effect="blur"
            src={post.img}
            alt=""
            boxSize="100%"
            maxH="420px"
            objectFit="cover"
            mt="4"
          />
        </Box>
      </Box>
      <Flex justify="space-between" p="4">
        <Flex align="center" gap="4" onClick={handleLike} cursor="pointer">
          {isLoading ? 'loading' : data?.includes(currentUser?.id) ? (
            <FavoriteOutlinedIcon style={{ color: 'red' }} />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
          <Text>{data?.length} Likes</Text>
        </Flex>
        <Flex
          align="center"
          gap="4"
          onClick={() => setCommentOpen(!commentOpen)}
          cursor="pointer"
        >
          <TextsmsOutlinedIcon />
          <Text>Comments</Text>
        </Flex>
        <Flex align="center" gap="4">
          <ShareOutlinedIcon />
          <Text>Share</Text>
        </Flex>
      </Flex>
      {commentOpen && <Comments postId={post.id} />}
    </Box>
  );
};

export default Post;
