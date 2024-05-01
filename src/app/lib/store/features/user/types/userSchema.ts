export interface User {
  id: string;
  username: string;
  email: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
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

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  avatar: {
    url: string | undefined;
    id_picture: number | undefined;
  };
}

export interface DataUserUpdate extends Partial<RegisterData> {
  userId: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface UserSchema {
  status: 'none' | 'loading' | 'error';
  user: User | null;
  token: string | null;
  error: any | null;
}
