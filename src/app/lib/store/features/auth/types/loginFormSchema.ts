export interface LoginFormSchema {
  email: string;
  password: string;
  isLoading: boolean;
  error?: string;
}
