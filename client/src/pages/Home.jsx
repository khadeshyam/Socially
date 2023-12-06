import { Box } from "@chakra-ui/react";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import Share from "../components/Share";

function Home() {
  return (
    <Box
      backgroundColor="bgSoft"
      color="textColor"
      padding={{ base: "10px", md: "20px" }}
    >
      <Share />
      <Stories />
      <Posts />
    </Box>
  );
}

export default Home;
