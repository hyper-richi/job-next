import { auth } from '@/auth';
import ProfileClient from '@/components/ProfieClient/ProfileClient';
import { SessionProvider } from 'next-auth/react';

export default async function Profile() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ProfileClient />
    </SessionProvider>
  );
}
