// Client-side environment variables types starting with NEXT_PUBLIC
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ClientEnv {
  // Add client-side environment variables here if needed
  // Example: NEXT_PUBLIC_API_URL?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends ClientEnv {
      // Add other client env vars as needed
    }
  }
}

export {};

