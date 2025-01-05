import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/app.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./hooks/queries/authentication.hooks";
import { query } from "./lib/query";
import { router } from "./lib/router";

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const authentication = useAuth();

  return <RouterProvider context={{ authentication }} router={router} />;
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={query}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
}
