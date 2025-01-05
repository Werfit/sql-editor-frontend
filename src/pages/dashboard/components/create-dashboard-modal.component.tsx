import { Icon } from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateWorkspaceMutation } from "@/hooks/queries/workspace.hooks";
import {
  CreateWorkspaceSchema,
  createWorkspaceSchema,
} from "@/shared/schema/workspace.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateDashboardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createWorkspaceMutation } = useCreateWorkspaceMutation({
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="toolbar">
          <Icon type="add" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new dashboard</DialogTitle>
          <DialogDescription>
            Fill in the name field below to start working on a new project
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit((data) => {
            createWorkspaceMutation(data.name);
          })}
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="E. g. Sales Shop..." />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateDashboardModal };
