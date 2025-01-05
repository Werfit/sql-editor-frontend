import { AuthenticationResponse } from "@/service/authentication/authentication.types";
import { logger } from "@/service/logger/logger.service";
import { get, remove, set } from "@/service/storage/storage.service";
import { environment } from "@/shared/configuration/environment";
import { AuthenticationStorage } from "@/shared/constants/storage.constants";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: environment.backendURI,
});

instance.interceptors.request.use((config) => {
  const accessToken = get<string>(AuthenticationStorage.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let failedRequests: {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}[] = [];
let isTokenRefreshing = false;

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config!;

    if (!error.response || error.response.status !== 403) {
      return Promise.reject(error);
    }

    if (isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequests.push({
          resolve,
          reject,
          error,
          config: originalConfig,
        });
      });
    }

    isTokenRefreshing = true;
    const refreshToken = get<string>(AuthenticationStorage.REFRESH_TOKEN);

    try {
      if (!refreshToken) {
        throw new Error("Unauthorized");
      }

      const response = await axios.post<
        Pick<AuthenticationResponse, "accessToken" | "refreshToken">
      >(`${environment.backendURI}/authentication/refresh`, {
        refreshToken,
      });

      set(AuthenticationStorage.ACCESS_TOKEN, response.data.accessToken);
      set(AuthenticationStorage.REFRESH_TOKEN, response.data.refreshToken);
      failedRequests.forEach((request) =>
        instance(request.config)
          .then((response) => request.resolve(response))
          .catch((error) => request.reject(error))
      );
    } catch (error) {
      logger.error((error as Error).message);

      remove(AuthenticationStorage.ACCESS_TOKEN);
      remove(AuthenticationStorage.REFRESH_TOKEN);

      failedRequests.forEach((request) => request.reject(error as AxiosError));

      return Promise.reject(error);
    } finally {
      isTokenRefreshing = false;
      failedRequests = [];
    }

    return instance(originalConfig);
  }
);

export { instance as axios };
