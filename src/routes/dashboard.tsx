import { AuthStatus } from "@/hooks/queries/use-authentication-queries.hook";
import { Dashboard } from "@/pages/dashboard/dasboard.page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    let shouldRedirect = false;

    if (context.authentication.status === AuthStatus.PENDING) {
      try {
        await context.authentication.authenticate();
      } catch {
        shouldRedirect = true;
      }
    }

    if (context.authentication.status === AuthStatus.UNAUTHENTICATED) {
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      throw redirect({
        to: "/authentication",
      });
    }
  },
});

function RouteComponent() {
  return <Dashboard />;
}
