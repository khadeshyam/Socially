// Sidebar.js
import React from 'react';
import { Box, HStack, VStack, IconButton, Text, Flex,useColorMode } from '@chakra-ui/react';
import {
  Home,
  Explore,
  FavoriteBorder,
  Search,
  Person,
  DarkMode,
  LightMode,
  Menu,
  SettingsApplications
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Leftbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box 
    bg={colorMode === 'light' ? 'white' : 'black'} // Set background color based on the color mode
    color={colorMode === 'light' ? 'black' : 'white'} // Set text color based on the color mode

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
         background: "gray.400"
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

        <Link to="/profile">
          <HStack w="100%" p={2} borderRadius="8px">
            <IconButton icon={<Home fontSize='medium' />} aria-label="Home" background="transparent"  />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Home</Text>
          </HStack>
        </Link>

        <Link to="/search">
          <HStack w="100%" p={2} borderRadius="8px">
            <IconButton icon={<Search fontSize='medium' />} aria-label="Home" background="transparent"  />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Search</Text>
          </HStack>
        </Link>

        {/* <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" >
          <IconButton icon={<VideoLibrary fontSize='medium' />} aria-label="Reels" background="transparent" />
          <Text fontSize="sm" fontWeight="bold" ml={2}>Reels</Text>
        </HStack> */}

        <Link to="/explore">
          <HStack w="100%" p={2} borderRadius="8px" >
            <IconButton icon={<Explore fontSize='medium' />} aria-label="Explore" background="transparent"  />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Explore</Text>
          </HStack>
        </Link>

        <Link to="/favorites">
          <HStack w="100%" p={2} borderRadius="8px" >
            <IconButton icon={<FavoriteBorder fontSize='medium' />} aria-label="Favorites" background="transparent"  />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Favorites</Text>
          </HStack>
        </Link>

        <Link to="/profile">
          <HStack w="100%" p={2} borderRadius="8px" >
            <IconButton icon={<Person fontSize='medium' />} aria-label="Profile" background="transparent"  />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Profile</Text>
          </HStack>
        </Link>
        <Link to="/settings">
          <HStack w="100%" p={2} borderRadius="8px">
            <IconButton icon={<SettingsApplications fontSize='medium' />} aria-label="Settings" background="transparent"  />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Settings</Text>
          </HStack>
        </Link>
        <Link to="/menu">
          <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px">
            <IconButton icon={<Menu />} aria-label="Menu" background="transparent"  />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Menu</Text>
          </HStack>
        </Link>
        <IconButton
          icon={colorMode === 'light' ? <DarkMode/> : <LightMode />}
          aria-label="Toggle Dark Mode"
          onClick={toggleColorMode}
          ml={2}
        />



      </VStack>
    </Box>
  );
};

export default Leftbar;
