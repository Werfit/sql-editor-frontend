import { UserMenu } from "./components/user-menu.component";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/queries/use-authentication-queries.hook";
import { Link } from "@tanstack/react-router";

type NavigationProps = {
  toolbar?: React.ReactNode | React.ReactNode[];
};

const Navigation: React.FC<NavigationProps> = ({ toolbar: toolbar }) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-end gap-2 p-6">
      {toolbar}

      {user && <UserMenu />}

      {!user && (
        <Button variant="link" asChild>
          <Link to="/authentication">Login</Link>
        </Button>
      )}
    </div>
  );
};

export { Navigation };
