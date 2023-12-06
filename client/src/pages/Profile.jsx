import {
  Box,
  Image,
  Flex,
  Link,
  Text,
  Button,
  Circle,
  IconButton,
} from "@chakra-ui/react";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../components/Posts";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from '../context/authContext';
import  Update  from '../components/Update';

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
        bg="brand.backgroundSoft"
        className="profile"
        p={{ base: "10px", md: "20px" }}
      >
        <Flex className="images" direction={{ base: "column", md: "row" }}>
          <Image
            src={data?.coverPic || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
            alt=""
            className="cover"
            w="100%"
            h={{ base: "300px", md: "100%" }}
            objectFit="cover"
          />
          <Circle
            src={data?.profilePic || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
            alt=""
            className="profilePic"
            size="200px"
            borderRadius="full"
            objectFit="cover"
            position="absolute"
            left="0"
            right="0"
            margin="auto"
            top="200px"
          />
        </Flex>
        <Flex className="profileContainer" direction="column" padding={{ base: "10px", md: "20px" }}>
          <Flex
            className="uInfo"
            h={{ base: "30vh", md: "180px" }}
            boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
            borderRadius="20px"
            bg="brand.bg"
            color="brand.textColor"
            padding={{ base: "20px", md: "60px 16px 8px 16px" }}
            alignItems="center"
            justifyContent="space-between"
            marginBottom="20px"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Flex className="left" flex={{ base: "1", md: "unset" }} gap="10px" flexWrap={{ md: "wrap" }}>
              <Link href="http://facebook.com" color="brand.textColorSoft">
                <FacebookTwoToneIcon fontSize="large" />
              </Link>
              <Link href="http://facebook.com" color="brand.textColorSoft">
                <InstagramIcon fontSize="large" />
              </Link>
              <Link href="http://facebook.com" color="brand.textColorSoft">
                <TwitterIcon fontSize="large" />
              </Link>
              <Link href="http://facebook.com" color="brand.textColorSoft">
                <LinkedInIcon fontSize="large" />
              </Link>
            </Flex>
            <Flex className="center" flex="1" direction="column" alignItems="center" gap="10px">
              <Text>{data?.username}</Text>
              <Flex className="info" w="100%" justifyContent="space-around">
                <Flex className="item" alignItems="center" gap="5px" color="brand.textColorSoft">
                  <PlaceIcon />
                  <Text fontSize="12px">{data?.city}</Text>
                </Flex>
                <Flex className="item" alignItems="center" gap="5px" color="brand.textColorSoft">
                  <LanguageIcon />
                  <Text fontSize="12px">{data?.website}</Text>
                </Flex>
              </Flex>
              {userId === currentUser?.id ? (
                <Button onClick={() => setOpenUpdate(true)}>update</Button>
              ) : (
                <Button onClick={handleFollow}>
                  {relationshipData?.includes(currentUser.id) ? "following" : "follow"}
                </Button>
              )}
            </Flex>
            <Flex className="right" flex={{ base: "1", md: "unset" }} alignItems="center" justifyContent="flex-end" gap="10px">
              <EmailOutlinedIcon />
              <IconButton
                aria-label="More options"
                icon={<MoreVertIcon />}
                colorScheme="brand"
                variant="outline"
              />
            </Flex>
          </Flex>
          <Posts userId={userId} />
        </Flex>
      </Box>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </Box>
  );
};

export default Profile;