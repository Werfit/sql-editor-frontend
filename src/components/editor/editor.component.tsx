import { useLocalEditorState } from "@/hooks/use-local-editor-state.hook";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactCodeMirror from "@uiw/react-codemirror";
import { RefObject, useImperativeHandle } from "react";

type EditorProps = {
  editorRef?: RefObject<{
    content: string;
  }>;
  workspaceId: string;
};

const Editor: React.FC<EditorProps> = ({ editorRef, workspaceId }) => {
  const [content, { setValue: setContent }] = useLocalEditorState(workspaceId);

  useImperativeHandle(
    editorRef,
    () => ({
      content,
    }),
    [content]
  );

  return (
    <ReactCodeMirror
      value={content}
      onChange={(value) => {
        setContent(value);
      }}
      height="100vh"
      extensions={[
        sql({
          dialect: PostgreSQL,
        }),
      ]}
      theme={dracula}
    />
  );
};

export { Editor };
