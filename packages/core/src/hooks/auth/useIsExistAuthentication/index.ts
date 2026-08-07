import { useAuthProviderContext } from "@contexts/auth";

/**
 * A hook that the UI uses
 * @internal
 */
export const useIsExistAuthentication = (): boolean => {
  const { isProvided } = useAuthProviderContext();

  return Boolean(isProvided);
};
