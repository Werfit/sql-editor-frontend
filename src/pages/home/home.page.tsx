import { Navigation } from "@/components/layout/navigation/navigation.component";

import { EditorView } from "./components/editor-view.component";
import { EditorToolbar } from "@/pages/home/components/editor-toolbar.component";

const Home = () => (
  <main className="relative">
    <header className="fixed z-10 w-full">
      <Navigation toolbar={<EditorToolbar />} />
    </header>

    <div className="flex gap-5 *:flex-1">
      <EditorView />
    </div>
  </main>
);

export { Home };
