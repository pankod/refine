import { useKeys } from "@hooks/useKeys";
import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateAuthStore = () => {
  const queryClient = useQueryClient();
  const { keys } = useKeys();

  const invalidate = async () => {
    await Promise.all(
      (["check", "identity", "permissions"] as const).map((action) =>
        queryClient.invalidateQueries({
          queryKey: keys().auth().action(action).get(),
        }),
      ),
    );
  };

  return invalidate;
};
