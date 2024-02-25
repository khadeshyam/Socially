import {
  Box,
  Image,
  Flex,
  Link,
  Text,
  Button,
  Avatar
} from "@chakra-ui/react";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../components/Posts";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../utils/axios';
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from '../context/authContext';
import Update from '../components/Update';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const location = useLocation();
  const userId = parseInt(location.pathname.split("/")[2]);
  const { currentUser } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => makeRequest.get(`/users/find/${userId}`).then((res) => res.data)
  });

  const { data: relationshipData } = useQuery({
    queryKey: ['relationships', userId],
    queryFn: () => makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => res.data)
  });

  const queryClient = useQueryClient();
  const mutation = useMutation((following) => {
    if (following) return makeRequest.delete(`/relationships?followedUserId=${userId}`);
    return makeRequest.post('/relationships', { followedUserId: userId });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['relationships']);
    },
  });

  const handleFollow = async () => {
    mutation.mutate(relationshipData?.includes(currentUser?.id));
  };

  return (
    <Box>
      <Box
        p={{ base: "10px", sm: "15px", md: "20px", lg: "25px", xl: "30px" }}
      >
        <Flex position="relative">
          <Image
            src={data?.coverPic || "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"}
            alt=""
            w="100%"
            h={{ base: "150px", sm: "175px", md: "200px", lg: "225px", xl: "250px" }}
            fit="fill"
          />
          <Avatar
            src={data?.profilePic}
            alt=""
            name={data?.username}
            position="absolute"
            top="50%"
            left="50%"
            transform="translateX(-50%) translateY(-50%)"
            boxSize={{ base: "50px", sm: "75px", md: "100px", lg: "100px", xl: "125px" }}
          />
        </Flex>
        <Flex direction="column" p={{ base: "10px", sm: "15px", md: "20px", lg: "25px", xl: "30px" }}>
          <Flex
            h={{ base: "30vh", sm: "35vh", md: "40vh", lg: "45vh", xl: "50vh" }}
            boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
            borderRadius="20px"
            p={{ base: "20px", sm: "30px", md: "40px", lg: "50px", xl: "60px" }}
            alignItems="center"
            justifyContent="space-between"
            mb="20px"
            direction={{ base: "column", sm: "row" }}
          >
            <Flex flex="1" direction="column" alignItems="center" gap="10px">
              <Text fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }}>{data?.username}</Text>
              <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "2", sm: "4" }}>
                {data?.city && <Flex alignItems="center" gap="5px" >
                  <PlaceIcon />
                  <Text textAlign="center" fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "md", xl: "lg" }}>{data?.city}</Text>
                </Flex>}
                {data?.website && 
                  <Flex alignItems="center" gap="5px">
                    <LanguageIcon />
                    <Link 
                      href={data?.website} 
                      isExternal 
                      color="blue.500" 
                      _hover={{ textDecoration: 'underline' }}
                      fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "md", xl: "lg" }}
                    >
                      {data?.website}
                    </Link>
                  </Flex>
                }
              </Flex>
              {(userId === currentUser?.id) ? (
                <Button onClick={() => setOpenUpdate(true)}>update</Button>
              ) : (
                <Button onClick={handleFollow}>
                  {relationshipData?.includes(currentUser.id) ? "following" : "follow"}
                </Button>
              )}
            </Flex>
          </Flex>
          <Posts userId={userId} />
        </Flex>
      </Box>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </Box>
  );
}
export default Profile;