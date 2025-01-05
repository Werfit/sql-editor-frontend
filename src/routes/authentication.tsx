import { AuthStatus } from "@/hooks/queries/authentication.hooks";
import { AuthenticationPage } from "@/pages/authentication/login.page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/authentication")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.authentication.status === AuthStatus.AUTHENTICATED) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return <AuthenticationPage />;
}
