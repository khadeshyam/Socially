import React, { lazy, Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate
} from "react-router-dom";
import { useAuth } from './hooks/useAuth';
const Loading = lazy(() => import("./components/Loading"));
const Post = lazy(() => import("./components/Post"));
const Posts = lazy(() => import("./components/Posts"));
const Layout = lazy(() => import("./components/Layout"));
const ChatRecommendations = lazy(() => import("./components/ChatRecommendations"));
const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Chat = lazy(() => import("./pages/Chat"));

const App = () => {
  const { currentUser } = useAuth();
  console.log('currentUser', currentUser);


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
          path: "/comments/:id",
          element: <Post isCommentOpen={true} userId={currentUser?.id} isDescTruncated={false}/>,
        },
        {
          path: "/post/:id",
          element: <Post userId={currentUser?.id} isDescTruncated={false}/>,
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
          path: "/chat-recommendations",
          element: <ChatRecommendations />,
        },
        {
          path: "/chat",
          element: <Chat />,
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
    },
    {
      path: "/*",
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
