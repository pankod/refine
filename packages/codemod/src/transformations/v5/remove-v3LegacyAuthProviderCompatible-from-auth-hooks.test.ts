import { removeV3LegacyAuthProviderCompatibleFromAuthHooks } from "./remove-v3LegacyAuthProviderCompatible-from-auth-hooks";

import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  removeV3LegacyAuthProviderCompatibleFromAuthHooks(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("remove-v3LegacyAuthProviderCompatible-from-auth-hooks", () => {
  it("should remove v3LegacyAuthProviderCompatible from object with single property", () => {
    const source = `
      const result = useLogin({ 
        v3LegacyAuthProviderCompatible: true 
      });
    `;

    const expected = `
      const result = useLogin();
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should remove v3LegacyAuthProviderCompatible from object with multiple properties", () => {
    const source = `
      const result = useLogin({ 
        redirect: "/dashboard",
        v3LegacyAuthProviderCompatible: true,
        onSuccess: () => {}
      });
    `;

    const expected = `
      const result = useLogin({
        redirect: "/dashboard",
        onSuccess: () => {},
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should remove v3LegacyAuthProviderCompatible from object with spread operator", () => {
    const source = `
      const result = useLogin({ 
        ...config,
        v3LegacyAuthProviderCompatible: true 
      });
    `;

    const expected = `
      const result = useLogin({
        ...config,
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle hooks without arguments", () => {
    const source = `
      const result = useLogin();
    `;

    const expected = `
      const result = useLogin();
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle objects without v3LegacyAuthProviderCompatible property", () => {
    const source = `
      const result = useLogin({ 
        redirect: "/dashboard"
      });
    `;

    const expected = `
      const result = useLogin({ 
        redirect: "/dashboard"
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with all auth hooks", () => {
    const source = `
      useLogin({ v3LegacyAuthProviderCompatible: true });
      useLogout({ v3LegacyAuthProviderCompatible: true });
      useGetIdentity({ v3LegacyAuthProviderCompatible: true });
      useRegister({ v3LegacyAuthProviderCompatible: true });
    `;

    const expected = `
      useLogin();
      useLogout();
      useGetIdentity();
      useRegister();
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
