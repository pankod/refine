import React, { useState } from "react";

import { useLink, useLogin, useTranslate } from "@hooks";

import type { DivPropsType, FormPropsType } from "../..";
import type { LoginFormTypes, LoginPageProps } from "../../types";

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title = undefined,
  hideForm,
  mutationVariables,
}) => {
  const Link = useLink();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const translate = useTranslate();

  const { mutate: login } = useLogin<LoginFormTypes>();

  const renderLink = (link: string, text?: string) => {
    return <Link to={link}>{text}</Link>;
  };

  const renderProviders = () => {
    if (providers) {
      return providers.map((provider) => (
        <div
          key={provider.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() =>
              login({
                ...mutationVariables,
                providerName: provider.name,
              })
            }
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {provider?.icon}
            {provider.label ?? <label>{provider.label}</label>}
          </button>
        </div>
      ));
    }
    return null;
  };

  const content = (
    <div {...contentProps}>
      <h1 style={{ textAlign: "center" }}>
        {translate("pages.login.title", "Sign in to your account")}
      </h1>
      {renderProviders()}
      {!hideForm && (
        <>
          <hr />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login({ ...mutationVariables, email, password, remember });
            }}
            {...formProps}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 25,
              }}
            >
              <label htmlFor="email-input">
                {translate("pages.login.fields.email", "Email")}
              </label>
              <input
                id="email-input"
                name="email"
                type="text"
                size={20}
                autoCorrect="off"
                spellCheck={false}
                autoCapitalize="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password-input">
                {translate("pages.login.fields.password", "Password")}
              </label>
              <input
                id="password-input"
                type="password"
                name="password"
                required
                size={20}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {rememberMe ?? (
                <>
                  <label htmlFor="remember-me-input">
                    {translate("pages.login.buttons.rememberMe", "Remember me")}
                    <input
                      id="remember-me-input"
                      name="remember"
                      type="checkbox"
                      size={20}
                      checked={remember}
                      value={remember.toString()}
                      onChange={() => {
                        setRemember(!remember);
                      }}
                    />
                  </label>
                </>
              )}
              <br />
              {forgotPasswordLink ??
                renderLink(
                  "/forgot-password",
                  translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?",
                  ),
                )}
              <input
                type="submit"
                value={translate("pages.login.signin", "Sign in")}
              />
              {registerLink ?? (
                <span>
                  {translate(
                    "pages.login.buttons.noAccount",
                    "Don’t have an account?",
                  )}{" "}
                  {renderLink(
                    "/register",
                    translate("pages.login.register", "Sign up"),
                  )}
                </span>
              )}
            </div>
          </form>
        </>
      )}
      {registerLink !== false && hideForm && (
        <div style={{ textAlign: "center" }}>
          {translate("pages.login.buttons.noAccount", "Don’t have an account?")}{" "}
          {renderLink(
            "/register",
            translate("pages.login.register", "Sign up"),
          )}
        </div>
      )}
    </div>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
