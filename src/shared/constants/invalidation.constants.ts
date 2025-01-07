export const AuthenticationQuery = {
  USER: "user",
  LOGIN: "login",
  SIGN_UP: "sign-up",
  LOGOUT: "logout",
} as const;

export const WorkspaceQuery = {
  LIST: "list-workspaces",
  CREATE: "create",
  DELETE: "delete",
  GET: "workspace",
  RUN: "run",
} as const;
