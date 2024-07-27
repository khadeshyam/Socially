// Sidebar.js
import React, { useContext } from 'react';
import { Box, HStack, VStack, IconButton, Text, Flex } from '@chakra-ui/react';
import {
  Home,
  Explore,
  FavoriteBorder,
  Person,
  Message
} from '@mui/icons-material';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


const Leftbar = () => {
  const { currentUser } = useContext(AuthContext);


  return (
    <Box
      bg={'white'} // Set background color based on the color mode
      color={'black'} // Set text color based on the color mode
      h="100vh"
      p={4}
      w="100%"
      position="sticky"
      top="0"
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: "1px",
        background: "#dcdcdc"
      }}
    >
      <VStack spacing={2} align="stretch">
        <Flex justifyContent="left" p={2} mb={6}>
          <Text fontWeight="bold" fontSize="24px">
            <Link to="/" style={{ textDecoration: "none" }}>
              Socially
            </Link>
          </Text>
        </Flex>

        <Link to="/">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px">
            <IconButton icon={<Home fontSize='medium' />} aria-label="Home" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Home</Text>
          </HStack>
        </Link>

        <Link to="/feed">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
            <IconButton icon={<Explore fontSize='medium' />} aria-label="Explore" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Feed</Text>
          </HStack>
        </Link>

        <Link to="/favorites">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
            <IconButton icon={<FavoriteBorder fontSize='medium' />} aria-label="Favorites" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Favorites</Text>
          </HStack>
        </Link>

        <Link to={`/profile/${currentUser?.id}`}>
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
            <IconButton icon={<Person fontSize='medium' />} aria-label="Profile" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Profile</Text>
          </HStack>
        </Link>
        <Link to="/chat-recommendations">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px">
            <IconButton icon={<Message fontSize='medium' />} aria-label="Messages" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Messages</Text>
          </HStack>
        </Link>

        <Logout />

      </VStack>
    </Box>
  );
};

export default Leftbar;
