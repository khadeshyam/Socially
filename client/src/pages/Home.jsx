import { Box } from "@chakra-ui/react";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import Post from "../components/Post";
import Share from "../components/Share";

function Home() {
  return (
    <Box
    >
      <Share />
      {/* <Stories /> */}
      {/* <Posts /> */}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
}

export default Home;
