import { authBindingsTypeToProvider } from "./auth-bindings-type-to-provider";

import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  authBindingsTypeToProvider(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("auth-bindings-type-to-provider", () => {
  // Basic type import scenarios
  it("should transform type AuthBindings import and preserve usage", () => {
    const source = `
      import { type AuthBindings } from "@refinedev/core";
    `;

    const expected = `
      import { type AuthProvider as AuthBindings } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform inline type import and preserve usage", () => {
    const source = `
      import type { AuthBindings } from "@refinedev/core";
    `;

    const expected = `
      import type { AuthProvider as AuthBindings } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Preserve existing aliases
  it("should preserve existing aliases in type imports", () => {
    const source = `
      import { type AuthBindings as MyAuth } from "@refinedev/core";
    `;

    const expected = `
      import { type AuthProvider as MyAuth } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve existing aliases in inline type imports", () => {
    const source = `
      import type { AuthBindings as MyAuthType } from "@refinedev/core";
    `;

    const expected = `
      import type { AuthProvider as MyAuthType } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Mixed imports scenarios
  it("should handle mixed imports with other types and values", () => {
    const source = `
      import { 
        Refine, 
        type AuthBindings,
        type DataProvider 
      } from "@refinedev/core";
    `;

    const expected = `
      import { 
        Refine, 
        type AuthProvider as AuthBindings,
        type DataProvider 
      } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle mixed inline and regular type imports", () => {
    const source = `
      import type { AuthBindings, DataProvider } from "@refinedev/core";
      import { Refine } from "@refinedev/core";
    `;

    const expected = `
      import type { AuthProvider as AuthBindings, DataProvider } from "@refinedev/core";
      import { Refine } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Usage preservation scenarios
  it("should preserve type usage in function parameters", () => {
    const source = `
      import { type AuthBindings } from "@refinedev/core";
      
      function setupAuth(auth: AuthBindings) {
        return auth;
      }
    `;

    const expected = `
      import { type AuthProvider as AuthBindings } from "@refinedev/core";
      
      function setupAuth(auth: AuthBindings) {
        return auth;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve type usage in variable declarations", () => {
    const source = `
      import type { AuthBindings } from "@refinedev/core";
      
      const myAuth: AuthBindings = {
        login: async () => ({ success: true }),
        check: async () => ({ authenticated: true }),
        logout: async () => ({ success: true }),
        onError: async () => ({})
      };
    `;

    const expected = `
      import type { AuthProvider as AuthBindings } from "@refinedev/core";
      
      const myAuth: AuthBindings = {
        login: async () => ({ success: true }),
        check: async () => ({ authenticated: true }),
        logout: async () => ({ success: true }),
        onError: async () => ({})
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve type usage in interface definitions", () => {
    const source = `
      import { type AuthBindings } from "@refinedev/core";
      
      interface AppConfig {
        auth: AuthBindings;
        title: string;
      }
    `;

    const expected = `
      import { type AuthProvider as AuthBindings } from "@refinedev/core";
      
      interface AppConfig {
        auth: AuthBindings;
        title: string;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve type usage in generic types", () => {
    const source = `
      import type { AuthBindings } from "@refinedev/core";
      
      type CustomAuth<T extends AuthBindings> = T & {
        custom: boolean;
      };
    `;

    const expected = `
      import type { AuthProvider as AuthBindings } from "@refinedev/core";
      
      type CustomAuth<T extends AuthBindings> = T & {
        custom: boolean;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve type usage in class implementations", () => {
    const source = `
      import { type AuthBindings } from "@refinedev/core";
      
      class AuthService implements AuthBindings {
        async login() {
          return { success: true };
        }
        
        async check() {
          return { authenticated: true };
        }
        
        async logout() {
          return { success: true };
        }
        
        async onError() {
          return {};
        }
      }
    `;

    const expected = `
      import { type AuthProvider as AuthBindings } from "@refinedev/core";
      
      class AuthService implements AuthBindings {
        async login() {
          return { success: true };
        }
        
        async check() {
          return { authenticated: true };
        }
        
        async logout() {
          return { success: true };
        }
        
        async onError() {
          return {};
        }
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Edge cases
  it("should not transform unrelated imports", () => {
    const source = `
      import { type AuthBindings } from "other-package";
      import type { SomeOtherType } from "@refinedev/core";
    `;

    const expected = `
      import { type AuthBindings } from "other-package";
      import type { SomeOtherType } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform non-type imports", () => {
    const source = `
      import { AuthBindings } from "@refinedev/core";
    `;

    const expected = `
      import { AuthBindings } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle complex mixed scenarios", () => {
    const source = `
      import React from "react";
      import { 
        Refine,
        type AuthBindings,
        type DataProvider,
        type RouterProvider
      } from "@refinedev/core";
      
      interface MyAppProps {
        auth: AuthBindings;
        data: DataProvider;
      }
      
      function MyApp(props: MyAppProps) {
        const { auth }: { auth: AuthBindings } = props;
        return <Refine authProvider={auth} />;
      }
    `;

    const expected = `
      import React from "react";
      import { 
        Refine,
        type AuthProvider as AuthBindings,
        type DataProvider,
        type RouterProvider
      } from "@refinedev/core";
      
      interface MyAppProps {
        auth: AuthBindings;
        data: DataProvider;
      }
      
      function MyApp(props: MyAppProps) {
        const { auth }: { auth: AuthBindings } = props;
        return <Refine authProvider={auth} />;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle multiple import statements from same module", () => {
    const source = `
      import { Refine } from "@refinedev/core";
      import type { AuthBindings, DataProvider } from "@refinedev/core";
      import { type RouterProvider } from "@refinedev/core";
    `;

    const expected = `
      import { Refine } from "@refinedev/core";
      import type { AuthProvider as AuthBindings, DataProvider } from "@refinedev/core";
      import { type RouterProvider } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle auth provider implementation patterns", () => {
    const source = `
      import type { AuthBindings } from "@refinedev/core";
      
      const authProvider: AuthBindings = {
        login: async ({ email, password }) => {
          // login logic
          return { success: true };
        },
        check: async () => {
          const token = localStorage.getItem("token");
          return { authenticated: !!token };
        },
        logout: async () => {
          localStorage.removeItem("token");
          return { success: true };
        },
        onError: async (error) => {
          if (error.response?.status === 401) {
            return { logout: true };
          }
          return {};
        },
        getIdentity: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            return { id: 1, name: "John Doe" };
          }
          return null;
        }
      };
    `;

    const expected = `
      import type { AuthProvider as AuthBindings } from "@refinedev/core";
      
      const authProvider: AuthBindings = {
        login: async ({ email, password }) => {
          // login logic
          return { success: true };
        },
        check: async () => {
          const token = localStorage.getItem("token");
          return { authenticated: !!token };
        },
        logout: async () => {
          localStorage.removeItem("token");
          return { success: true };
        },
        onError: async (error) => {
          if (error.response?.status === 401) {
            return { logout: true };
          }
          return {};
        },
        getIdentity: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            return { id: 1, name: "John Doe" };
          }
          return null;
        }
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
