import { Navigation } from "@/components/layout/navigation/navigation.component";

import { DashboardToolbar } from "./components/dashboard-toolbar.component";
import { WorkspaceList } from "./components/workspace-list.component";

const Dashboard = () => {
  return (
    <main className="relative">
      <header>
        <Navigation toolbar={<DashboardToolbar />} />
      </header>

      <WorkspaceList className="px-6" />
    </main>
  );
};

export { Dashboard };
