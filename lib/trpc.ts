// lib/trpc.ts (mobile)
// For now, we'll create a mock TRPC client until the backend connection is properly set up

export const trpc = {
  tripRegister: {
    getCities: {
      useQuery: (input: { state_iso2: string }, options?: any) => {
        // Mock implementation - replace with actual TRPC when backend is ready
        return {
          data: undefined,
          isLoading: false,
          error: null,
        };
      },
    },
  },
};
