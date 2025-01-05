import { HttpResponse, HttpResponseError } from "../response.util";
import { axios } from "@/lib/axios";
import { AxiosError } from "axios";

type RequestParams = Record<
  string,
  string | number | string[] | number[] | boolean | boolean[]
>;

class HTTPRequest {
  async get<R>(
    url: string,
    params: RequestParams = {}
  ): Promise<HttpResponse<R>> {
    try {
      const response = await axios.get<R>(url, {
        params,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error_) {
      const error = error_ as AxiosError;
      const responseError = error.response?.data as HttpResponseError;

      const message = responseError?.message ?? error.message;

      return {
        success: false,
        data: {
          message,
        },
      };
    }
  }

  async post<R>(
    url: string,
    body?: Record<string, unknown>
  ): Promise<HttpResponse<R>> {
    try {
      const response = await axios.post<R>(url, body);

      return {
        success: true,
        data: response.data,
      };
    } catch (error_) {
      const error = error_ as AxiosError;
      const responseError = error.response?.data as HttpResponseError;

      const message = responseError?.message ?? error.message;

      return {
        success: false,
        data: {
          message,
        },
      };
    }
  }

  async delete<R>(url: string): Promise<HttpResponse<R>> {
    try {
      const response = await axios.delete<R>(url);

      return {
        success: true,
        data: response.data,
      };
    } catch (error_) {
      const error = error_ as AxiosError;
      const responseError = error.response?.data as HttpResponseError;

      const message = responseError?.message ?? error.message;

      return {
        success: false,
        data: {
          message,
        },
      };
    }
  }
}

const httpRequest = new HTTPRequest();
export { httpRequest };
