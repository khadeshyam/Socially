import React, { useContext } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // Temporary Data
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <Flex className="stories" gap={8} height="250px" marginBottom="24px">
      <Box className="story" flex="1" borderRadius="8px" overflow="hidden" position="relative" boxShadow="0 1px 4px rgba(0,0,0,0.3)" transition="box-shadow 0.3s ease">
        <Image src={currentUser?.profilePic} alt="story" height="100%" width="100%" objectFit="cover" />
        <Text position="absolute" bottom="8px" left="8px" color="white" fontWeight="500" display={{ base: "none", md: "block" }}>
          {currentUser?.username}
        </Text>
        <Button
          variant="circle"
          position="absolute"
          bottom="16px"
          right="16px"
          color="white"
          backgroundColor="#5271ff"
          border="none"
          cursor="pointer"
          height="32px"
          width="32px"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{ backgroundColor: "#4057c2" }}
        >
          +
        </Button>
      </Box>

      {stories?.map((story) => (
        <Box key={story.id} className="story" flex="1" borderRadius="8px" overflow="hidden" position="relative" boxShadow="0 1px 4px rgba(0,0,0,0.3)" transition="box-shadow 0.3s ease">
          <Image src={story.img} alt="story" height="100%" width="100%" objectFit="cover" />
          <Text position="absolute" bottom="8px" left="8px" color="white" fontWeight="500" display={{ base: "none", md: "block" }}>
            {story.name}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default Stories;
