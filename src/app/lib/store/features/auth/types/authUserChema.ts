export interface User {
  id: string;
  username: string;
  email: string;
  avatar: {
    url: string;
    id_picture: string;
  };
}

export interface AuthApiResponse {
  data: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUserSchema {
  status: 'idle' | 'loading' | 'failed';
  authUser: User | null;
  error: any | null;
}
