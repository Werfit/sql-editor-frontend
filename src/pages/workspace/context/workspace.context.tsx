import {
  RunWorkspaceResponse,
  Workspace,
} from "@/service/workspace/workspace.types";
import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type WorkspaceContextValues = [
  {
    workspace: Workspace;
    contentRef: RefObject<{ content: string }>;
    error: string | null;
    data: RunWorkspaceResponse | null;
  },
  {
    setError: (value: string) => void;
    setData: (value: RunWorkspaceResponse) => void;
  },
];

const WorkspaceContext = createContext<WorkspaceContextValues | null>(null);

export const WorkspaceProvider: React.FC<{
  workspace: Workspace;
  children: React.ReactNode;
}> = ({ workspace, children }) => {
  const editorRef = useRef({ content: "" });
  const [error, setOriginalError] = useState<string | null>(null);
  const [data, setOriginalData] = useState<RunWorkspaceResponse | null>(null);

  const setData = useCallback((value: RunWorkspaceResponse) => {
    setOriginalData(value);
    setOriginalError(null);
  }, []);

  const setError = useCallback((value: string) => {
    setOriginalData(null);
    setOriginalError(value);
  }, []);

  return (
    <WorkspaceContext.Provider
      value={[
        {
          workspace,
          contentRef: editorRef,
          error,
          data,
        },
        { setError, setData },
      ]}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("Failed to use Workspace Context outside its scope");
  }

  return context;
};
