import { DateString } from "@/shared/types/generic.types";

export type Workspace = {
  id: string;
  name: string;
  lastEdit: DateString;
  createdAt: DateString;
};

export type CreateWorkspaceResponse = Workspace;

export type ListWorkspacesResponse = Workspace[];

export type DeleteWorkspaceResponse = {
  success: boolean;
};
