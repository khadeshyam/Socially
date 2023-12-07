import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet
} from "react-router-dom";
import { useContext } from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ComingSoon from "./pages/CommingSoon";
import VerifyMail from "./pages/VerifyMail";
import { Box } from "@chakra-ui/react";
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Post from "./components/Post";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Box display="flex">
          <Box
            flex="2.15"
          >
            <LeftBar />
          </Box>
          <Box flex="6">
            <Outlet />
          </Box>
          <Box flex="3">
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/post/:id",
          element: <Post />,
        },
        {
          path: "/comment/:id",
          element: <Post isCommentOpen={true} />,
        }, {
          path: "/*",
          element: <ComingSoon />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verifymail",
      element: <VerifyMail />,
    }, {
      path: "/comingsoon",
      element: <ComingSoon />,
    }
  ]);

  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
