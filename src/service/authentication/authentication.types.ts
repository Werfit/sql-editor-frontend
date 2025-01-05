export type User = {
  id: string;
  email: string;
};

export type AuthenticationResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
