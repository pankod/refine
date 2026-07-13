export const hasPermission = (
  permissions: string[] | undefined,
  action: string | undefined,
): boolean => {
  if (!permissions || !action) {
    return false;
  }
  return !!permissions.find((i) => i === action);
};
