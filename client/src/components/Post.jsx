import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../utils/axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import Comments from './Comments';
import TruncatedText from './TruncatedText';
import placeholderImage from '../assets/placeholder.png';

const Post = ({ post, isCommentOpen = false, isDescTruncated = true }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: pagePost } = useQuery(
    ['post', id],
    () => makeRequest.get(`/posts/${id}`).then((res) => res.data),
    { enabled: !post }
  );

  if (!post && pagePost) post = { ...pagePost };

  const { isLoading: isLikeLoading, data } = useQuery({
    queryKey: ['likes', post?.id],
    queryFn: () =>
      makeRequest.get('/likes?postId=' + post?.id).then((res) => res.data),
  });

  const likeMutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete('/likes?postId=' + post?.id);
      return makeRequest.post('/likes', { postId: post?.id });
    },
    {
      onMutate: (liked) => {
        queryClient.setQueryData(['likes', post?.id], (oldData) => {
          if (liked) {
            return oldData.filter((id) => id !== currentUser?.id);
          } else {
            return [...oldData, currentUser?.id];
          }
        });
      },
      onError: (error, liked, context) => {
        queryClient.setQueryData(['likes', post?.id], context.oldData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['likes', post?.id]);
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
        onClose();
      },
    }
  );

  const handleLike = async () => {
    likeMutation.mutate(data?.includes(currentUser?.id));
  };

  const handleDelete = async () => {
    deleteMutation.mutate(post?.id);
  };

  const LikeIcon = () => {
    if (!isLikeLoading && data?.includes(currentUser?.id)) {
      return <FavoriteOutlinedIcon style={{ color: '#ff6262' }} />;
    }
    return <FavoriteBorderOutlinedIcon />;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post!',
          url: `${window.location.origin}/post/${post?.id}`,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      console.log('Web Share API is not supported in your browser.');
    }
  };

  return (
    <Box borderRadius="lg" border="1px solid #dcdcdc" bgColor="white" color="black" margin="20px" padding="20px">
      <Flex align="center" justify="space-between" p="4">
        <Flex align="center">
          <Avatar
            src={post?.userProfilePic}
            name={post?.userName}
            borderRadius="full"
            mr="4"
          />
          <Box>
            <Link to={{ pathname: `/profile/${post?.userId}` }}>
              <Text fontWeight="500">{post?.userName}</Text>
            </Link>
            <Text fontSize="sm" color="gray.500">
              {moment(post?.createdAt).fromNow()}
            </Text>
          </Box>
        </Flex>
        {post?.userId === currentUser?.id && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MoreHorizIcon />}
              variant="ghost"
              _hover={{ bg: 'transparent' }}
            />
            <MenuList
              minWidth="unset"
              width="auto"
              borderRadius="md"
              border="1px solid #e2e8f0"
              boxShadow="md"
            >
              <MenuItem
                onClick={onOpen}
                icon={<DeleteOutlineIcon />}
                _hover={{ bg: 'gray.100' }}
                _focus={{ bg: 'gray.100' }}
              >
                <Text fontSize="sm">Delete</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Box p="4">
        {isDescTruncated ? <TruncatedText text={post?.desc} postId={post?.id} wordLimit={20} />
          : <Text mt={4} mb={4}>{post?.desc}</Text>
        }
        <Box display="flex" justifyContent="center" alignItems="center" p="2" m="2" width="100%">
          <LazyLoadImage
            effect="blur"
            src={post?.img}
            placeholderSrc={placeholderImage}
            alt={post?.id}
            style={{ display: 'block', objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }}
            threshold={200}
          />
        </Box>
      </Box>
      <Flex justifyContent="flex-start" p="4" gap="10">
        <Flex align="center" gap="4" onClick={handleLike} cursor="pointer">
          <LikeIcon />
        </Flex>
        <Link to={{ pathname: `/comments/${post?.id}` }}>
          <Flex align="center" gap="4" cursor="pointer">
            <TextsmsOutlinedIcon />
          </Flex>
        </Link>
        <Flex align="center" gap="4" onClick={handleShare} cursor="pointer">
          <ShareOutlinedIcon />
        </Flex>
      </Flex>
      <Flex justifyContent="flex-start" p="4">
        <Text>{data?.length} Like{data?.length !== 1 && 's'}</Text>
      </Flex>
      {isCommentOpen && <Comments postId={post?.id ? post?.id : id} />}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this post?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Post;