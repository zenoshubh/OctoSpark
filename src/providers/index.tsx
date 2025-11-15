'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}

