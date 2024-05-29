export interface User {
  id: string;
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

export interface UsersApiResponse {
  data: User[];
}

export interface authProfileSchema {
  status: 'none' | 'loading' | 'error';
  error: any | null;
  users: User[] | null;
}
