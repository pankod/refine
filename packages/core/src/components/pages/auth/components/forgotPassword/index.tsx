import React, { useState } from "react";

import { useForgotPassword, useLink, useTranslate } from "@hooks";

import type { DivPropsType, FormPropsType } from "../..";
import type {
  ForgotPasswordFormTypes,
  ForgotPasswordPageProps,
} from "../../types";

type ForgotPasswordProps = ForgotPasswordPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
  mutationVariables,
}) => {
  const translate = useTranslate();
  const Link = useLink();

  const [email, setEmail] = useState("");

  const { mutate: forgotPassword, isPending } =
    useForgotPassword<ForgotPasswordFormTypes>();

  const renderLink = (link: string, text?: string) => {
    return <Link to={link}>{text}</Link>;
  };

  const content = (
    <div {...contentProps}>
      <h1 style={{ textAlign: "center" }}>
        {translate("pages.forgotPassword.title", "Forgot your password?")}
      </h1>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          forgotPassword({ ...mutationVariables, email });
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
            {translate("pages.forgotPassword.fields.email", "Email")}
          </label>
          <input
            id="email-input"
            name="email"
            type="mail"
            autoCorrect="off"
            spellCheck={false}
            autoCapitalize="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="submit"
            disabled={isPending}
            value={translate(
              "pages.forgotPassword.buttons.submit",
              "Send reset instructions",
            )}
          />
          <br />
          {loginLink ?? (
            <span>
              {translate(
                "pages.register.buttons.haveAccount",
                "Have an account? ",
              )}{" "}
              {renderLink("/login", translate("pages.login.signin", "Sign in"))}
            </span>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
