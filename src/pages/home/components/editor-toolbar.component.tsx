import { Icon } from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";

const EditorToolbar = () => {
  return (
    <div className="flex overflow-hidden rounded-md">
      <Button size="icon" variant="toolbar" className="rounded-none">
        <Icon type="play" />
      </Button>
      <Button size="icon" variant="toolbar" className="rounded-none">
        <Icon type="download" />
      </Button>
    </div>
  );
};

export { EditorToolbar };
