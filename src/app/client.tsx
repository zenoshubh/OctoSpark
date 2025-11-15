'use client';

import { GitHubScoreCalculator } from '@/components/github-score-calculator';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { Header } from '@/components/header';
import { useRouter, useSearchParams } from 'next/navigation';

export function PageClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle username restoration after sign-in
  useEffect(() => {
    if (session && status === 'authenticated') {
      // Check if there's a username in URL params (after sign-in redirect)
      const usernameFromUrl = searchParams.get('username');
      if (usernameFromUrl) {
        // Clear the URL parameter and trigger analysis
        router.replace('/');
        // Small delay to ensure the component is ready
        setTimeout(() => {
          // This will be handled by GitHubScoreCalculator
          const event = new CustomEvent('autoAnalyze', {
            detail: { username: usernameFromUrl },
          });
          window.dispatchEvent(event);
        }, 100);
      }
      // Check session storage as fallback
      const savedUsername = sessionStorage.getItem('pendingUsername');
      if (savedUsername) {
        sessionStorage.removeItem('pendingUsername');
        setTimeout(() => {
          const event = new CustomEvent('autoAnalyze', {
            detail: { username: savedUsername },
          });
          window.dispatchEvent(event);
        }, 100);
      }
    }
  }, [session, status, searchParams, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto" />
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-transparent">
        <GitHubScoreCalculator />
      </div>
    </>
  );
}

