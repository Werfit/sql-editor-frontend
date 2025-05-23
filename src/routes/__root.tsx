import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { RouterContext } from "@/lib/router";
import { GlobalError } from "@/pages/global-error.page";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: ({ error }) => <GlobalError message={error.message} />,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  );
}
