import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { RunWorkspaceResponse } from "@/service/workspace/workspace.types";
import { formatDate } from "@/shared/utils/formatter.util";
import { useMemo } from "react";

const processWorkspaceResponse = (result: RunWorkspaceResponse["result"]) => {
  return (
    result?.map((table) => {
      const filteredResult = (table ?? []).filter(
        (item) => item !== undefined && item !== null
      );

      if (filteredResult.length === 0) {
        return {
          headers: [],
          content: [],
        };
      }

      if (typeof filteredResult[0] === "object") {
        return {
          headers: Object.keys(filteredResult[0]),
          content: filteredResult,
        };
      }

      return {
        headers: [],
        content: [],
      };
    }) ?? []
  );
};

type QueryTableProps = {
  data: RunWorkspaceResponse;
};

const QueryTable: React.FC<QueryTableProps> = ({ data }) => {
  const processedResult = useMemo(
    () => processWorkspaceResponse(data.result),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.timestamp]
  );

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs tracking-wide text-muted-foreground">
        Query Result {formatDate(data.timestamp)}
      </h3>

      {processedResult.map((table) => (
        <Table>
          <TableHeader>
            <TableRow>
              {table.headers.map((header, index) => (
                <TableHead className="capitalize" key={index}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody />

          <TableBody>
            {table.content.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {table.headers.map((header, index) => (
                  <TableCell key={index}>
                    {(item as Record<string, unknown>)[header] as string}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
};

export { QueryTable };
