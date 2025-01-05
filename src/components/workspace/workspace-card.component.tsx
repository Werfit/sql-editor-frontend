import { formatDate } from "@/shared/utils/formatter.util";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Workspace } from "@/service/workspace/workspace.types";
import { WorkspaceMenu } from "./components/workspace-menu.component";
import { cn } from "@/shared/utils/cn.util";

type WorkspaceProps = {
  data: Workspace;
  pending?: boolean;
};

const WorkspaceCard: React.FC<WorkspaceProps> = ({ data, pending }) => {
  return (
    <Card>
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between",
          pending && "opacity-50"
        )}
      >
        <CardTitle>{data.name}</CardTitle>

        <WorkspaceMenu workspaceId={data.id} disabled={pending} />
      </CardHeader>
      <CardContent className="grid grid-rows-2">
        <CardDescription className="flex items-center gap-2">
          <b>Edited:</b>
          <span className="font-mono">{formatDate(data.createdAt)}</span>
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <b>Created:</b>
          <span className="font-mono">{formatDate(data.lastEdit)}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export { WorkspaceCard };
