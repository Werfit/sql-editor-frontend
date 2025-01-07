import { getWorkspaceOptions } from "@/hooks/queries/use-workspace-queries.hook";
import { WorkspaceNotFound } from "@/pages/workspace/not-found.page";
import { Workspace } from "@/pages/workspace/workspace.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$id")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(getWorkspaceOptions(params.id));
  },
  notFoundComponent: WorkspaceNotFound,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Workspace workspaceId={params.id} />;
}
