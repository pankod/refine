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

export const addV3LegacyAuthProviderCompatibleTrueToAuthHooks = (
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
      args.push(
        j.objectExpression([
          j.objectProperty(
            j.identifier("v3LegacyAuthProviderCompatible"),
            j.booleanLiteral(true),
          ),
        ]),
      );
      return;
    }

    if (args.length === 1) {
      const arg = args[0];
      if (arg.type === "ObjectExpression") {
        const legacyProp = arg.properties.find(
          (property) =>
            property["key"]?.name === "v3LegacyAuthProviderCompatible",
        );

        if (legacyProp) {
          return;
        }

        arg.properties.push(
          j.objectProperty(
            j.identifier("v3LegacyAuthProviderCompatible"),
            j.booleanLiteral(true),
          ),
        );
      }

      if (arg.type === "Identifier") {
        // turn to spread syntax and add v3LegacyAuthProviderCompatible
        const newArg = j.objectExpression([
          j.spreadElement(arg),
          j.objectProperty(
            j.identifier("v3LegacyAuthProviderCompatible"),
            j.booleanLiteral(true),
          ),
        ]);

        args[0] = newArg;
      }
      return;
    }
  });
};
