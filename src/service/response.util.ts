export type HttpResponseError = {
  message: string;
  statusCode: number;
  error: string;
};

export type HttpResponse<S, E = HttpResponseError> =
  | {
      success: true;
      data: S;
    }
  | {
      success: false;
      data: E;
    };
