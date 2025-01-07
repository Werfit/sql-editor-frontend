import { useWorkspace } from "@/pages/workspace/context/workspace.context";
import { QueryTable } from "./query-table.component";

const QueryResult = () => {
  const [{ error, data, workspace }] = useWorkspace();

  return (
    <div className="flex h-full flex-col gap-y-4 px-12 py-24">
      <h2 className="font-medium tracking-wider text-muted-foreground">
        {workspace.name}
      </h2>

      {error && (
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold leading-none tracking-tight text-muted-foreground">
            An error occurred during script execution
          </h4>

          <div className="rounded bg-slate-100 px-3 py-2 font-mono text-sm text-destructive">
            {error}
          </div>
        </div>
      )}

      {data !== null && <QueryTable data={data} />}
    </div>
  );
};

export { QueryResult };
