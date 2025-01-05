import { httpRequest } from "../http/http.service";
import {
  CreateWorkspaceResponse,
  DeleteWorkspaceResponse,
  ListWorkspacesResponse,
} from "./workspace.types";

export const createWorkspace = async (name: string) => {
  const { success, data } = await httpRequest.post<CreateWorkspaceResponse>(
    "/workspace",
    {
      name,
    }
  );

  if (!success) {
    throw new Error(data.message);
  }

  return data;
};

export const listWorkspaces = async () => {
  const { success, data } =
    await httpRequest.get<ListWorkspacesResponse>("/workspace");

  if (!success) {
    throw new Error(data.message);
  }

  return data;
};

export const deleteWorkspace = async (id: string) => {
  const { success, data } = await httpRequest.delete<DeleteWorkspaceResponse>(
    `/workspace/${id}`
  );

  if (!success) {
    throw new Error(data.message);
  }

  return data;
};
