import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { query } from "./query";
import { QueryClient } from "@tanstack/react-query";
import { UseAuth } from "@/hooks/queries/use-authentication-queries.hook";

export type RouterContext = {
  queryClient: QueryClient;
  authentication: UseAuth;
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    queryClient: query,
    authentication: null as unknown as UseAuth,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
