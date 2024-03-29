export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: {
    url: string;
    id_picture: string;
  };
}

export interface AuthUserSchema {
  isLoading: boolean;
  authData: {
    data: User;
    token: string;
  } | null;
}
