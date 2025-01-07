import { Editor } from "@/components/editor/editor.component";
import { Icon } from "@/components/icon/icon.component";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useWorkspace } from "../context/workspace.context";
import { QueryResult } from "./query-result.component";

type EditorViewProps = {
  workspaceId: string;
};

const EditorView: React.FC<EditorViewProps> = ({ workspaceId }) => {
  const queryResultRef = useRef<ImperativePanelHandle>(null);
  const [isQueryResultsOpened, setIsQueryResultsOpened] = useState(true);
  const [{ contentRef }] = useWorkspace();

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={25}>
        <Editor editorRef={contentRef} workspaceId={workspaceId} />
      </ResizablePanel>
      <ResizableHandle className="w-1 bg-gray-600" withHandle />
      <ResizablePanel ref={queryResultRef} collapsible minSize={25}>
        <QueryResult />
      </ResizablePanel>

      <Button
        className="fixed bottom-6 right-6"
        size="icon"
        onClick={() => {
          if (!queryResultRef.current) {
            return;
          }

          if (queryResultRef.current.isCollapsed()) {
            queryResultRef.current.expand();
            setIsQueryResultsOpened(true);
          } else {
            queryResultRef.current.collapse();
            setIsQueryResultsOpened(false);
          }
        }}
      >
        {isQueryResultsOpened ? (
          <Icon type="collapse" />
        ) : (
          <Icon type="expand" />
        )}
      </Button>
    </ResizablePanelGroup>
  );
};

export { EditorView };
