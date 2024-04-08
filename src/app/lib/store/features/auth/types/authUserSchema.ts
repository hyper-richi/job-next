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

export interface RegistrData {
  username: string;
  email: string;
  password: string;
  avatar: {
    url: string | undefined;
    id_picture: number | undefined;
  };
}

export interface AuthUserSchema {
  status: 'idle' | 'loading' | 'error';
  authUser: User | null;
  error: any | null;
}
