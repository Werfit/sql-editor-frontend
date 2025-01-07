import { Navigation } from "@/components/layout/navigation/navigation.component";
import { Button } from "@/components/ui/button";
import { Error, ErrorDescription, ErrorTitle } from "@/components/ui/error";

import {
  AuthStatus,
  useAuth,
} from "@/hooks/queries/use-authentication-queries.hook";
import { useRouter } from "@tanstack/react-router";

const WorkspaceNotFound = () => {
  const { status } = useAuth({ skipInvalidation: true });
  const router = useRouter();

  return (
    <div>
      <header>{status === AuthStatus.AUTHENTICATED && <Navigation />}</header>

      <Error className="my-40 px-6">
        <ErrorTitle>Not Found</ErrorTitle>
        <ErrorDescription>This workspace doesn't exist.</ErrorDescription>

        <Button onClick={() => router.invalidate()}>Try again</Button>
      </Error>
    </div>
  );
};

export { WorkspaceNotFound };
