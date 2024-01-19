import { removeLogsInProduction } from "./utils/remove-logs-in-production";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/authContext";
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Loading = lazy(() => import("./components/Loading"));
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Suspense fallback={Loading}>
          <App />
        </Suspense>
      </AuthContextProvider>
    </QueryClientProvider>
  </ChakraProvider>
  // </React.StrictMode>
);

removeLogsInProduction();