import { Box,Text, Button, FormControl, FormLabel, Input, Link as ChakraLink, Flex, useToast } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { loggin, currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!inputs.usernameOrEmail || !inputs.password) {
        throw new Error("Please fill in all the fields");
      }
      setIsLoading(true);
      await loggin(inputs);
    } catch (err) {
      const message = err.response?.data?.message || err?.message;
      setMsg(message);
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      bgGradient="linear(to-r, #4facfe, #00f2fe)"
    >
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
        <Flex direction="column" align="center">
          <Text fontSize="2xl" mb={4}>
            Login
          </Text>
          <FormControl isRequired>
            <FormLabel>Username or Email</FormLabel>
            <Input type="text" placeholder="Username or Email" name="usernameOrEmail" onChange={handleChange} />
          </FormControl>
          <FormControl mt={2} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
          </FormControl>
          <Box mt={4} textAlign="center">
            <Button
              colorScheme="teal"
              onClick={handleLogin}
              isLoading={isLoading}
              loadingText="Logging In"
              mx="auto"
              display="block"
            >
              Login
            </Button>
          </Box>
          <Box mt={2}>
            <Text>
              Don't have an account?{" "}
              <ChakraLink as={Link} to="/register" color="teal.500">
                Register
              </ChakraLink>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Login;
