import {
  queryOptions,
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useToast } from "../use-toast";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  listWorkspaces,
  runWorkspace,
} from "@/service/workspace/workspace.service";
import { WorkspaceQuery } from "@/shared/constants/invalidation.constants";
import { useWorkspace } from "@/pages/workspace/context/workspace.context";

type MutationProps = {
  onSuccess?: () => void;
} | void;

export const useListWorkspacesMutation = () => {
  return useQuery({
    queryFn: listWorkspaces,
    queryKey: [WorkspaceQuery.LIST],
    retry: false,
  });
};

export const useCreateWorkspaceMutation = (params: MutationProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    mutationKey: [WorkspaceQuery.LIST],
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
      queryClient.invalidateQueries({ queryKey: [WorkspaceQuery.LIST] }),
  });
};

export const useCreateWorkspaceMutationState = () => {
  return useMutationState<{
    name: string;
    submittedAt: Date;
  }>({
    filters: { mutationKey: [WorkspaceQuery.CREATE], status: "pending" },
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
    mutationKey: [WorkspaceQuery.DELETE],
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
      queryClient.invalidateQueries({ queryKey: [WorkspaceQuery.LIST] }),
  });
};

export const useRunWorkspace = () => {
  const [{ contentRef }, { setError, setData }] = useWorkspace();

  return useMutation({
    mutationFn: (workspaceId: string) =>
      runWorkspace({
        id: workspaceId,
        code: contentRef.current?.content ?? "",
      }),
    mutationKey: [WorkspaceQuery.RUN],
    onSuccess: (data) => setData(data),
    onError: (error) => setError(error.message),
  });
};

export const getWorkspaceOptions = (id: string) =>
  queryOptions({
    queryKey: [WorkspaceQuery.GET],
    queryFn: () => getWorkspace(id),
    retry: false,
  });

export const useSuspenseGetWorkspace = (id: string) => {
  return useSuspenseQuery(getWorkspaceOptions(id));
};
