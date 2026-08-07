import { useAuthProviderContext } from "@contexts/auth";

/**
 * @returns authProvider if provided, otherwise null
 * @internal
 */
export const useActiveAuthProvider = () => {
  const authProvider = useAuthProviderContext();

  if (authProvider.isProvided) {
    return authProvider;
  }

  return null;
};
