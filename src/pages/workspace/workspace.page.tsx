import { Navigation } from "@/components/layout/navigation/navigation.component";

import { EditorView } from "./components/editor-view.component";
import { EditorToolbar } from "@/pages/workspace/components/editor-toolbar.component";
import { WorkspaceProvider } from "./context/workspace.context";
import { useSuspenseGetWorkspace } from "@/hooks/queries/use-workspace-queries.hook";

type WorkspaceProps = {
  workspaceId: string;
};

const Workspace: React.FC<WorkspaceProps> = ({ workspaceId }) => {
  const { data } = useSuspenseGetWorkspace(workspaceId);

  return (
    <main className="relative">
      <WorkspaceProvider workspace={data}>
        <header className="fixed right-0 z-10">
          <Navigation toolbar={<EditorToolbar workspaceId={workspaceId} />} />
        </header>

        <div className="flex gap-5 *:flex-1">
          <EditorView workspaceId={workspaceId} />
        </div>
      </WorkspaceProvider>
    </main>
  );
};

export { Workspace };
