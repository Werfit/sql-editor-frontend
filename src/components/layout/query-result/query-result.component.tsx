import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const QueryResult = () => {
  return (
    <div className="flex h-full flex-col gap-y-4 px-12 py-24">
      <h2 className="font-medium tracking-wider text-muted-foreground">
        Title of the table
      </h2>

      <Table>
        <TableCaption>Query Result {new Date().toDateString()}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Sales Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>25-11-2003</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export { QueryResult };
