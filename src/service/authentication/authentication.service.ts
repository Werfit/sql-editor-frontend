import { httpRequest } from "../http/http.service";
import { AuthenticationResponse, User } from "./authentication.types";

export const login = async (email: string, password: string) => {
  const { success, data } = await httpRequest.post<AuthenticationResponse>(
    "/authentication/login",
    {
      email,
      password,
    }
  );

  if (!success) {
    throw new Error(data.message);
  }

  return data;
};

export const signUp = async (email: string, password: string) => {
  const { success, data } = await httpRequest.post<AuthenticationResponse>(
    "/authentication/sign-up",
    {
      email,
      password,
    }
  );

  if (!success) {
    throw new Error(data.message);
  }

  return data;
};

export const logout = async () => {
  const { success, data } = await httpRequest.post<void>(
    "/authentication/logout"
  );

  if (!success) {
    throw new Error(data.message);
  }

  return data;
};

export const getUser = async () => {
  const { success, data } = await httpRequest.get<{ user: User }>(
    "/authentication/verify"
  );

  if (!success) {
    throw new Error(data.message);
  }

  return data;
};
