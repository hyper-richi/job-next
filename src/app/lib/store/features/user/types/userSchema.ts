export interface User extends Omit<RegisterUserData, 'password'> {
  id: string;
}

export interface AuthApiResponse {
  data: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  password: string;
  name: string;
  email: string;
  image: string;
  id_picture: number | null;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface DataUserUpdate extends Partial<RegisterUserData> {
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
