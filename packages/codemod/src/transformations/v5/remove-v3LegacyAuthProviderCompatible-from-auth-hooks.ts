import type { Collection, JSCodeshift } from "jscodeshift";

const authHookNames = [
  "useForgotPassword",
  "useGetIdentity",
  "useIsAuthenticated",
  "useAuthenticated",
  "useLogin",
  "useLogout",
  "useOnError",
  "useCheckError",
  "usePermission",
  "useRegister",
  "useUpdatePassword",
  "usePermissions",
];

export const removeV3LegacyAuthProviderCompatibleFromAuthHooks = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  const authHooks = root.find(j.CallExpression, {
    callee: {
      name: (name: string) => authHookNames.includes(name),
    },
  });

  authHooks.forEach((authHook) => {
    const args = authHook.value.arguments;

    if (args.length === 0) {
      return;
    }

    if (args.length >= 1 && args[0].type === "ObjectExpression") {
      const arg = args[0];

      const filteredProperties = arg.properties.filter((property) => {
        if (
          property.type === "ObjectProperty" ||
          property.type === "Property"
        ) {
          if (property.key && property.key.type === "Identifier") {
            return property.key.name !== "v3LegacyAuthProviderCompatible";
          }
        }
        return true;
      });

      if (filteredProperties.length !== arg.properties.length) {
        arg.properties = filteredProperties;

        if (filteredProperties.length === 0 && args.length === 1) {
          args.length = 0;
        }
      }
    }
  });
};
