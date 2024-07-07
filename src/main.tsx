import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./components/ui/theme-provider";
import { PrivyProvider } from "@privy-io/react-auth";
import { Toaster } from "sonner";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PrivyProvider
        appId="clxu7soax0c4vsabzb399ml7u"
        config={{
          loginMethods: ["email", "wallet"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "https://your-logo-url",
          },
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster theme="dark" />
        </QueryClientProvider>
      </PrivyProvider>
    </ThemeProvider>
  </React.StrictMode>
);
