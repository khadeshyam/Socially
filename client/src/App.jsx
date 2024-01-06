import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate
} from "react-router-dom";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Post from "./components/Post";
import Posts from "./components/Posts";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Box } from "@chakra-ui/react";
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { currentUser } = useAuth();
  console.log('currentUser', currentUser);

  const Layout = () => {
    return (
      <Box display="flex">
        <Box
          flex="2.15"
          display={{ base: "none", md: "block" }} // Hide on mobile, show on tablet and larger
        >
          <LeftBar />
        </Box>
        <Box flex="6">
          <Outlet />
        </Box>
        <Box
          flex="3"
          display={{ base: "none", lg: "block" }} // Hide on mobile and tablet, show on large screens and larger
        >
          <RightBar />
        </Box>
      </Box>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
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
          path: "/comments/:id",
          element: <Post isCommentOpen={true} userId={currentUser?.id}/>,
        },
        {
          path: "/profile:id",
          element: <Post isCommentOpen={true} userId={currentUser?.id}/>,
        },
        {
          path: "/feed",
          element: <Posts />,
        },
        {
          path: "/favorites",
          element: <Posts userId={currentUser?.id}/>,
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
      path: "/verify-email",
      element: <VerifyEmail />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    }, 
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    }, {
      path: "/comingsoon",
      element: <ComingSoon />,
    }
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
