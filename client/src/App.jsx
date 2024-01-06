import React, { lazy, Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate
} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useAuth } from './hooks/useAuth';
const Loading = lazy(() => import("./components/Loading"));
const LeftBar = lazy(() => import("./components/LeftBar"));
const RightBar = lazy(() => import("./components/RightBar"));
const Post = lazy(() => import("./components/Post"));
const Posts = lazy(() => import("./components/Posts"));
const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const App = () => {
  const { currentUser } = useAuth();
  console.log('currentUser', currentUser);

  const Layout = () => {
    return (
      <Suspense fallback={<Loading />}>
        <Box display="flex">
          <Suspense fallback={<Loading />}>
            <Box
              flex="2.15"
              display={{ base: "none", md: "block" }}
            >
              <LeftBar />
            </Box>
          </Suspense>
          <Box flex="6">
            <Outlet />
          </Box>
          <Suspense fallback={<Loading />}>
            <Box
              flex="3"
              display={{ base: "none", lg: "block" }}
            >
              <RightBar />
            </Box>
          </Suspense>
        </Box>
      </Suspense>
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
          element: <Post isCommentOpen={true} userId={currentUser?.id} />,
        },
        {
          path: "/profile:id",
          element: <Post isCommentOpen={true} userId={currentUser?.id} />,
        },
        {
          path: "/feed",
          element: <Posts />,
        },
        {
          path: "/favorites",
          element: <Posts userId={currentUser?.id} />,
        },
        {
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
    },
    {
      path: "/comingsoon",
      element: <ComingSoon />,
    }
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
