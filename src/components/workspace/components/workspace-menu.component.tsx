import { Icon } from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteWorkspaceMutation } from "@/hooks/queries/use-workspace-queries.hook";
import { Workspace } from "@/service/workspace/workspace.types";
import { Link } from "@tanstack/react-router";
import { memo } from "react";

type WorkspaceMenuProps = {
  workspaceId: Workspace["id"];
  disabled?: boolean;
};

const WorkspaceMenu: React.FC<WorkspaceMenuProps> = memo(
  ({ workspaceId, disabled }) => {
    const { mutate } = useDeleteWorkspaceMutation();

    return (
      <div className="flex items-center gap-1">
        <Button variant="secondary" size="icon" asChild>
          <Link
            to="/workspace/$id"
            params={{
              id: workspaceId,
            }}
          >
            <Icon type="play-list" />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={disabled}>
            <Button variant="ghost" size="icon">
              <Icon type="more" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => mutate(workspaceId)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

export { WorkspaceMenu };
