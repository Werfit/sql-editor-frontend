import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../use-toast";
import {
  createWorkspace,
  deleteWorkspace,
  listWorkspaces,
} from "@/service/workspace/workspace.service";

type MutationProps = {
  onSuccess?: () => void;
} | void;

export const useListWorkspacesMutation = () => {
  return useQuery({
    queryFn: listWorkspaces,
    queryKey: ["listWorkspaces"],
    retry: false,
  });
};

export const useCreateWorkspaceMutation = (params: MutationProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    mutationKey: ["createWorkspace"],
    onSuccess: () => {
      if (typeof params === "object") {
        params.onSuccess?.();
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create a workspace",
        description: error.message,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["listWorkspaces"] }),
  });
};

export const useCreateWorkspaceMutationState = () => {
  return useMutationState<{
    name: string;
    submittedAt: Date;
  }>({
    filters: { mutationKey: ["createWorkspace"], status: "pending" },
    select: (mutation) =>
      ({
        name: mutation.state.variables,
        submittedAt: new Date(mutation.state.submittedAt),
      }) as {
        name: string;
        submittedAt: Date;
      },
  });
};

export const useDeleteWorkspaceMutation = (params: MutationProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkspace,
    mutationKey: ["deleteWorkspace"],
    onSuccess: () => {
      if (typeof params === "object") {
        params.onSuccess?.();
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete a workspace",
        description: error.message,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["listWorkspaces"] }),
  });
};
