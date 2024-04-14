import 'next-auth';
import { User as CustomUser } from './src/app/lib/store/features/auth/types/authUserSchema';

declare module 'next-auth' {

  interface Session {
    user: CustomUser;
  }
}

