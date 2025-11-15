// Server-side environment variables types
interface ServerEnv {
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  NEXTAUTH_URL?: string;
  NEXTAUTH_SECRET?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends ServerEnv {
      // Add other server env vars as needed
    }
  }
}

export {};

