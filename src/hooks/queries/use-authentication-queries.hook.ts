import { useCallback, useEffect } from "react";

import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getUser,
  login,
  logout,
  signUp,
} from "@/service/authentication/authentication.service";
import {
  LoginSchema,
  SignUpSchema,
} from "@/shared/schema/authentication.schema";
import {
  AuthenticationResponse,
  User,
} from "@/service/authentication/authentication.types";
import { remove, set } from "@/service/storage/storage.service";
import { useRouter } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";
import { router } from "@/lib/router";
import { AuthenticationQuery } from "@/shared/constants/invalidation.constants";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { toast } = useToast();

  return useMutation<AuthenticationResponse, Error, LoginSchema>({
    mutationFn: ({ email, password }) => login(email, password),
    mutationKey: [AuthenticationQuery.LOGIN],
    onSuccess: async (data) => {
      set("__authentication_at", data.accessToken);
      set("__authentication_rt", data.refreshToken);

      await queryClient.invalidateQueries({
        queryKey: [AuthenticationQuery.USER],
      });

      await router.navigate({
        to: "/dashboard",
      });
    },
    onError: (error) => {
      toast({
        title: "Authentication failed",
        variant: "destructive",
        description: error.message,
      });
    },
  });
};

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation<AuthenticationResponse, Error, SignUpSchema>({
    mutationFn: ({ email, password }) => signUp(email, password),
    mutationKey: [AuthenticationQuery.SIGN_UP],
    onSuccess: async (data) => {
      set("__authentication_at", data.accessToken);
      set("__authentication_rt", data.refreshToken);

      await queryClient.invalidateQueries({
        queryKey: [AuthenticationQuery.USER],
      });

      await router.navigate({
        to: "/dashboard",
      });
    },
    onError: (error) => {
      toast({
        title: "Authentication failed",
        variant: "destructive",
        description: error.message,
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    mutationKey: [AuthenticationQuery.LOGOUT],
    onSuccess: async () => {
      remove("__authentication_at");
      remove("__authentication_rt");

      queryClient.setQueryData(["user"], null);

      await router.invalidate();
    },
    onError: () => {
      remove("__authentication_at");
      remove("__authentication_rt");
    },
  });
};

const authQueryOptions = () =>
  queryOptions({
    queryKey: [AuthenticationQuery.USER],
    queryFn: getUser,
  });

export const AuthStatus = {
  PENDING: "pending",
  UNAUTHENTICATED: "unauthenticated",
  AUTHENTICATED: "authenticated",
} as const;

export type UseAuth = {
  user: User | null;
  status: (typeof AuthStatus)[keyof typeof AuthStatus];
  authenticate: () => ReturnType<typeof getUser>;
};

export const useAuth = (
  { skipInvalidation }: { skipInvalidation: boolean } = {
    skipInvalidation: true,
  }
): UseAuth => {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery(authQueryOptions());

  useEffect(() => {
    // constant invalidation on user update might cause infinite page reload sometimes (mostly preload behavior related, e.g. workspace preload and error navigation that uses useAuth)
    // it's enough to enable invalidation on the level of the application
    if (!skipInvalidation) {
      router.invalidate();
    }
  }, [data, skipInvalidation]);

  useEffect(() => {
    if (error === null) {
      return;
    }

    queryClient.setQueryData([AuthenticationQuery.USER], null);
  }, [error, queryClient]);

  const authenticate = useCallback(() => {
    return queryClient.ensureQueryData(authQueryOptions());
  }, [queryClient]);

  if (isPending) {
    return {
      user: null,
      status: AuthStatus.PENDING,
      authenticate,
    };
  }

  if (!data) {
    return {
      user: null,
      status: AuthStatus.UNAUTHENTICATED,
      authenticate,
    };
  }

  return {
    user: data.user,
    status: AuthStatus.AUTHENTICATED,
    authenticate,
  };
};
