import { Icon } from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteWorkspaceMutation } from "@/hooks/queries/workspace.hooks";
import { Workspace } from "@/service/workspace/workspace.types";
import { memo } from "react";

type WorkspaceMenuProps = {
  workspaceId: Workspace["id"];
  disabled?: boolean;
};

const WorkspaceMenu: React.FC<WorkspaceMenuProps> = memo(
  ({ workspaceId, disabled }) => {
    const { mutate } = useDeleteWorkspaceMutation();

    return (
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
    );
  }
);

export { WorkspaceMenu };
