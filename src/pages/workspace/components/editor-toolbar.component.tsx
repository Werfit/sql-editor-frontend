import { Icon } from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import { useRunWorkspace } from "@/hooks/queries/use-workspace-queries.hook";

type EditorToolbarProps = {
  workspaceId: string;
};

const EditorToolbar: React.FC<EditorToolbarProps> = ({ workspaceId }) => {
  const { mutate } = useRunWorkspace();

  return (
    <div className="flex overflow-hidden rounded-md">
      <Button
        size="icon"
        variant="toolbar"
        className="rounded-none"
        onClick={async () => {
          mutate(workspaceId);
        }}
      >
        <Icon type="play" />
      </Button>
      <Button size="icon" variant="toolbar" className="rounded-none">
        <Icon type="download" />
      </Button>
    </div>
  );
};

export { EditorToolbar };
