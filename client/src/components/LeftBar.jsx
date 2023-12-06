// Sidebar.js
import React from 'react';
import { Box, HStack, VStack, IconButton, Text, Flex } from '@chakra-ui/react';
import {
  Home,
  Explore,
  FavoriteBorder,
  Search,
  Person,
  VideoLibrary,
  Menu,
  SettingsApplications
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <Box bg="white" h="100vh" p={4} boxShadow="md" w="250px">
      <VStack spacing={2} align="stretch">
        <Flex justifyContent="left" p={2} mb={6}>
          <Text fontWeight="bold" fontSize="24px" color='black' >
            <Link to="/" style={{ textDecoration: "none" }}>
              Socially
            </Link>
          </Text>
        </Flex>

        <Link to="/profile">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px">
            <IconButton icon={<Home fontSize='medium' />} aria-label="Home" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Home</Text>
          </HStack>
        </Link>

        <Link to="/search">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px">
            <IconButton icon={<Search fontSize='medium' />} aria-label="Home" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Search</Text>
          </HStack>
        </Link>

        {/* <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
          <IconButton icon={<VideoLibrary fontSize='medium' />} aria-label="Reels" background="transparent" _hover={{ bg: 'transparent' }}/>
          <Text fontSize="sm" fontWeight="bold" ml={2}>Reels</Text>
        </HStack> */}

        <Link to="/explore">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
            <IconButton icon={<Explore fontSize='medium' />} aria-label="Explore" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Explore</Text>
          </HStack>
        </Link>

        <Link to="/favorites">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
            <IconButton icon={<FavoriteBorder fontSize='medium' />} aria-label="Favorites" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Favorites</Text>
          </HStack>
        </Link>

        <Link to="/profile">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
            <IconButton icon={<Person fontSize='medium' />} aria-label="Profile" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Profile</Text>
          </HStack>
        </Link>
        <Link to="/settings">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px">
            <IconButton icon={<SettingsApplications fontSize='medium' />} aria-label="Settings" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Settings</Text>
          </HStack>
        </Link>
        <Link to="/menu">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px">
            <IconButton icon={<Menu />} aria-label="Menu" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Menu</Text>
          </HStack>
        </Link>



      </VStack>
    </Box>
  );
};

export default Sidebar;
