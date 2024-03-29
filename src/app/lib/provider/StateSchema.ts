import { LoginFormSchema } from '../store/features/auth/types/loginFormSchema';
import { CounterSchema } from '../store/features/counter/types/counterSchema';
import { AuthUserSchema } from '../store/features/user/types/userSchema';

export interface StateSchema {
  counter: CounterSchema;
  user: AuthUserSchema;
  loginForm: LoginFormSchema;
}
