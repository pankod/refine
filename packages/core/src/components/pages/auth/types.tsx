import React, { type PropsWithChildren } from "react";

export type OAuthProvider = {
  name: string;
  icon?: React.ReactNode;
  label?: string;
};

export interface LoginFormTypes {
  email?: string;
  password?: string;
  remember?: boolean;
  providerName?: string;
  redirectPath?: string;
}

export interface RegisterFormTypes {
  email?: string;
  password?: string;
  providerName?: string;
}

export interface ForgotPasswordFormTypes {
  email?: string;
}

export interface UpdatePasswordFormTypes {
  password?: string;
  confirmPassword?: string;
}

/**
 * This should be the base type for `AuthPage` component implementations in UI integrations.
 */
export type AuthPageProps<
  TWrapperProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TFormProps extends {} = Record<keyof any, unknown>,
> = (
  | PropsWithChildren<{
      /**
       * @description The type of the auth page.
       * @default "login"
       * @optional
       */
      type?: "login";
      /**
       * @description Providers array for login with third party auth services.
       * @type [OAuthProvider](/docs/api-reference/core/components/auth-page/#interface)
       * @optional
       */
      providers?: OAuthProvider[];
      /**
       * @description Render a redirect to register page button node. If set to false, register button will not be rendered.
       * @default `"/register"`
       * @optional
       */
      registerLink?: React.ReactNode;
      /**
       * @description Render a redirect to forgot password page button node. If set to false, forgot password button will not be rendered.
       * @default `"/forgot-password"`
       * @optional
       */
      forgotPasswordLink?: React.ReactNode;
      /**
       * @description Render a remember me button node. If set to false, remember me button will not be rendered.
       * @optional
       */
      rememberMe?: React.ReactNode;
      /**
       * @description Can be used to hide the form components
       * @optional
       */
      hideForm?: boolean;
    }>
  | PropsWithChildren<{
      /**
       * @description The type of the auth page.
       * @optional
       */
      type: "register";
      /**
       * @description Providers array for login with third party auth services.
       * @optional
       */
      providers?: OAuthProvider[];
      /**
       * @description Render a redirect to login page button node. If set to false, login button will not be rendered.
       * @default `"/login"`
       * @optional
       */
      loginLink?: React.ReactNode;
      /**
       * @description Can be used to hide the form components
       * @optional
       */
      hideForm?: boolean;
    }>
  | PropsWithChildren<{
      /**
       * @description The type of the auth page.
       * @optional
       */
      type: "forgotPassword";
      /**
       * @description render a redirect to login page button node. If set to false, login button will not be rendered.
       * @optional
       */
      loginLink?: React.ReactNode;
    }>
  | PropsWithChildren<{
      /**
       * @description The type of the auth page.
       * @optional
       */
      type: "updatePassword";
    }>
) & {
  /**
   * @description The props that will be passed to the wrapper component.
   * @optional
   */
  wrapperProps?: TWrapperProps;
  /**
   * @description The props that will be passed to the content component.
   * @optional
   */
  contentProps?: TContentProps;
  /**
   * @description This method gives you the ability to render a custom content node.
   * @optional
   */
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  /**
   * @description Can be used to pass additional properties for the `Form`
   * @optional
   */
  formProps?: TFormProps;
  /**
   * @description Can be used to pass `Title`
   * @optional
   *  */
  title?: React.ReactNode;
  /**
   * @description Can be used to pass additional variables to the mutation. This is useful when you need to pass other variables to the authProvider.
   */
  mutationVariables?: Record<string, any>;
};

/**
 * This should be the base type for `AuthPage` `Login` component implementations in UI integrations.
 */
export type LoginPageProps<
  TWrapperProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
  providers?: OAuthProvider[];
  registerLink?: React.ReactNode;
  forgotPasswordLink?: React.ReactNode;
  rememberMe?: React.ReactNode;
  wrapperProps?: TWrapperProps;
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  contentProps?: TContentProps;
  formProps?: TFormProps;
  title?: React.ReactNode;
  hideForm?: boolean;
  mutationVariables?: Record<string, unknown>;
}>;

/**
 * This should be the base type for `AuthPage` `Register` component implementations in UI integrations.
 */
export type RegisterPageProps<
  TWrapperProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
  providers?: OAuthProvider[];
  loginLink?: React.ReactNode;
  wrapperProps?: TWrapperProps;
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  contentProps?: TContentProps;
  formProps?: TFormProps;
  title?: React.ReactNode;
  hideForm?: boolean;
  mutationVariables?: Record<string, unknown>;
}>;

/**
 * This should be the base type for `AuthPage` `Reset Password` component implementations in UI integrations.
 */
export type ForgotPasswordPageProps<
  TWrapperProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
  loginLink?: React.ReactNode;
  wrapperProps?: TWrapperProps;
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  contentProps?: TContentProps;
  formProps?: TFormProps;
  title?: React.ReactNode;
  mutationVariables?: Record<string, unknown>;
}>;

/**
 * This should be the base type for `AuthPage` `Update Password` component implementations in UI integrations.
 */
export type UpdatePasswordPageProps<
  TWrapperProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
  wrapperProps?: TWrapperProps;
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  contentProps?: TContentProps;
  formProps?: TFormProps;
  title?: React.ReactNode;
  mutationVariables?: Record<string, unknown>;
}>;
