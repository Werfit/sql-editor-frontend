import { WorkspaceCard } from "@/components/workspace/workspace-card.component";
import {
  useCreateWorkspaceMutationState,
  useListWorkspacesMutation,
} from "@/hooks/queries/use-workspace-queries.hook";
import { cn } from "@/shared/utils/cn.util";

type WorkspaceListProps = {
  className?: string;
};

const WorkspaceList: React.FC<WorkspaceListProps> = ({ className }) => {
  const { data, isLoading, isError } = useListWorkspacesMutation();
  const variables = useCreateWorkspaceMutationState();

  if (isError) {
    return (
      <div className={cn("text-center", className)}>
        <i className="text-muted-foreground">
          Error during fetching happened. Try again later
        </i>
      </div>
    );
  }

  if (isLoading && !data) {
    <div className={cn("text-center", className)}>
      <i className="text-muted-foreground">Loading...</i>
    </div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn("text-center", className)}>
        <i className="text-muted-foreground">
          Nothing here yet. Create a workspace and you will be able to see it
          here.
        </i>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3",
        className
      )}
    >
      {variables.map((variables, index) => (
        <WorkspaceCard
          key={index}
          data={{
            id: index.toString(),
            name: variables.name,
            createdAt: variables.submittedAt.toISOString(),
            lastEdit: variables.submittedAt.toISOString(),
          }}
          pending
        />
      ))}

      {data.map((workspace) => (
        <WorkspaceCard key={workspace.id} data={workspace} />
      ))}
    </div>
  );
};

export { WorkspaceList };
