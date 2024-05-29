import 'next-auth';
import { User as CustomUser, AuthApiResponse as authProfile } from './src/app/lib/store/features/authProfile/types/authProfileSchema';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
    authToken: string;
  }
}
