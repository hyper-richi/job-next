import 'next-auth';
import { User as CustomUser, AuthApiResponse as AuthUser } from './src/app/lib/store/features/user/types/userSchema';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
    authToken: string;
  }
  // interface Session extends CustomUser {}
}
