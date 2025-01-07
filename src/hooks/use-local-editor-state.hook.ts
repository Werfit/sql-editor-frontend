import { get, remove, set } from "@/service/storage/storage.service";
import { useCallback, useRef, useState } from "react";

type UseLocalEditorState = [
  value: string,
  {
    setValue: (value: string) => void;
    clear: () => void;
  },
];

const EDITOR_KEY = "__editor_content";

const getWorkspaceStoredContent = (workspaceId: string) => {
  const storedValue = get<{ content: string; workspaceId: string }>(EDITOR_KEY);

  if (!storedValue) {
    return "";
  }

  if (storedValue.workspaceId !== workspaceId) {
    return "";
  }

  return storedValue.content;
};

export const useLocalEditorState = (
  workspaceId: string
): UseLocalEditorState => {
  const [content, setContent] = useState(
    getWorkspaceStoredContent(workspaceId)
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setContentWithLocalState = useCallback(
    (value: string) => {
      setContent(value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        set(EDITOR_KEY, {
          content: value,
          workspaceId,
        });
      }, 300);
    },
    [workspaceId]
  );

  const clear = useCallback(() => {
    setContent("");
    remove(EDITOR_KEY);
  }, []);

  return [content, { setValue: setContentWithLocalState, clear }];
};
