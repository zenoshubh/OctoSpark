'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    // Check if there's a saved username that user was trying to analyze
    const savedUsername =
      sessionStorage.getItem('pendingUsername') ||
      localStorage.getItem('pendingUsername');
    const callbackUrl = savedUsername
      ? `${window.location.origin}?username=${encodeURIComponent(savedUsername)}`
      : window.location.origin;

    // Use regular redirect instead of popup
    await signIn('github', { callbackUrl });
  };

  return (
    <header className="relative z-10 flex justify-between items-center p-6 h-20 backdrop-blur-xl bg-gray-900/30 border-b border-gray-800/50">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md overflow-hidden relative">
          <Image
            src="/OctoSpark_Final.png"
            alt="OctoSpark Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <span className="hidden sm:block text-xl tracking-widest uppercase font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          OCTOSPARK
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {status === 'loading' ? (
          <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse"></div>
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ring-2 ring-purple-500/20 hover:ring-purple-500/50 transition-all duration-200"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user?.image || ''}
                    alt={session.user?.name || ''}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-gray-900/95 border border-purple-500/30 shadow-xl backdrop-blur-xl"
              align="end"
            >
              <div className="flex items-center justify-start gap-2 p-3">
                <div className="flex flex-col space-y-1 leading-none">
                  {session.user?.name && (
                    <p className="font-semibold text-white">
                      {session.user.name}
                    </p>
                  )}
                  {session.user?.email && (
                    <p className="text-xs text-purple-400">
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                className="text-gray-300 hover:text-white hover:bg-purple-500/10 focus:bg-purple-500/10 cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={handleSignIn}
            className="px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
