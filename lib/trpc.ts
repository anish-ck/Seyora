// lib/trpc.ts (mobile)
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

// Define the AppRouter type based on your web app structure
export type AppRouter = {
  tripRegister: any;
  registerationRouter: any;
  manageusers: any;
};

export const trpc = createTRPCReact<AppRouter>();

function getUrl() {
  // Replace with your actual web app URL
  const baseUrl = __DEV__ 
    ? 'http://localhost:3000'  // Development
    : 'https://your-production-url.com';  // Production
  
  return `${baseUrl}/api/trpc`;
}

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: getUrl(),
      transformer: superjson,
    }),
  ],
});
