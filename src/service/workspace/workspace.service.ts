import { notFound } from "@tanstack/react-router";
import { httpRequest } from "../http/http.service";
import {
  CreateWorkspaceResponse,
  DeleteWorkspaceResponse,
  GetWorkspaceResponse,
  ListWorkspacesResponse,
  RunWorkspaceResponse,
} from "./workspace.types";
import { HttpStatusCode } from "axios";

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

export const getWorkspace = async (id: string) => {
  const { success, data } = await httpRequest.get<GetWorkspaceResponse>(
    `/workspace/${id}`
  );

  if (!success) {
    if (data.statusCode === HttpStatusCode.NotFound) {
      throw notFound();
    }

    throw new Error(data.message);
  }

  return data;
};

export const runWorkspace = async ({
  id,
  code,
}: {
  id: string;
  code: string;
}) => {
  const { success, data } = await httpRequest.post<RunWorkspaceResponse>(
    "/workspace/run",
    {
      workspaceId: id,
      code,
    }
  );

  if (!success) {
    if (data.statusCode === HttpStatusCode.NotFound) {
      throw notFound();
    }

    throw new Error(data.message);
  }

  return data;
};
