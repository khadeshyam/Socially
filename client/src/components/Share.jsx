import React, { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  Button,
  Divider
} from '@chakra-ui/react';
import ImageIcon from '../assets/img.png';
import MapIcon from '../assets/map.png';
import FriendIcon from '../assets/friend.png';
import { AuthContext } from '../context/authContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { makeRequest } from '../axios';

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const uploadToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET_NAME);
      data.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data
      );
      return response?.data?.url;
    } catch (error) {
      console.error(error);
    }
  };

  const mutation = useMutation(
    (newPost) => makeRequest.post('/posts', newPost),
    {
      onSuccess: () => queryClient.invalidateQueries('posts'),
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadToCloudinary();
      mutation.mutate({ desc, img: uploadedImageUrl });
      setDesc('');
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      boxShadow="lg"
      borderRadius="lg"
      bgColor="white"
      color="black"
      marginBottom="20px"
      border="1px solid #dbdbdb"
      margin="20px" 
      padding="20px"
    >
      <Flex align="center" justify="space-between" >
        <Flex align="center" gap="20px" flex="3">
          <Image
            src={currentUser?.profilePic}
            borderRadius="full"
            boxSize="40px"
            fit="cover"
          />
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            resize="none"
            placeholder={`What's on your mind, ${currentUser?.username}?`}
            outline="none"
            padding="20px 10px"
            backgroundColor="transparent"
            width="100%"
            color="black"
            height="80px"
            borderRadius="5px" 
            overflow="hidden"
            borderColor='gray.500'
            _focus={{
              borderColor: 'gray.500', // Set the border color when the input is focused
            }}
          />
        </Flex>
        <Flex flex="1" justify="flex-end">
          {file && (
            <Image
              className="file"
              src={URL.createObjectURL(file)}
              alt="Upload"
              boxSize="100px"
              height="100px"
              fit="cover"
              borderRadius="0px"
            />
          )}
        </Flex>
      </Flex>
       <Divider mt={2}/>
      <Flex align="center" justify="space-between" mt={2}>
        <Flex align="center" gap="20px">
          <label htmlFor="file">
            <Input
              type="file"
              accept="image/*"
              id="file"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Flex align="center" gap="10px" cursor="pointer" className="item">
              <Image src={ImageIcon} alt="" height="20px" />
              <Text fontSize="12px" color="gray">
                Add Image
              </Text>
            </Flex>
          </label>
          <Flex align="center" gap="10px" className="item" cursor="pointer">
            <Image src={MapIcon} alt="" height="20px" />
            <Text fontSize="12px" color="gray">
              Add Place
            </Text>
          </Flex>
          <Flex align="center" gap="10px" className="item" cursor="pointer">
            <Image src={FriendIcon} alt="" height="20px" />
            <Text fontSize="12px" color="gray">
              Tag Friends
            </Text>
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          <Button
            onClick={handleClick}
            disabled={isLoading}
            border="none"
            padding="10px"
            color="white"
            cursor="pointer"
            backgroundColor="#5271ff"
            borderRadius="3px"
          >
            Share
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Share;
