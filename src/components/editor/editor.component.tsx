import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactCodeMirror from "@uiw/react-codemirror";

const Editor = () => (
  <ReactCodeMirror
    height="100vh"
    extensions={[
      sql({
        dialect: PostgreSQL,
      }),
    ]}
    theme={dracula}
  />
);

export { Editor };
