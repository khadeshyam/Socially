import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ComingSoon from "./pages/CommingSoon";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
          <Box display="flex">
            <Box flex="2">
              <LeftBar />
            </Box>
            <Box flex="6">
              <Outlet />
            </Box>
            <Box flex="2">
              <RightBar />
            </Box>
        </Box>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    // if (!currentUser) {
    //   return <Navigate to="/login" />;
    // }
    return children;
  };

  const router = (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<ComingSoon />} />
      </Routes>
    </Router>
  );

  return (
    <ChakraProvider>
      <Box>
        {router}
      </Box>
    </ChakraProvider>
  );
}

export default App;
