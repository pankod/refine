import React from "react";
import {
  type LoginPageProps,
  type LoginFormTypes,
  useLink,
} from "@refinedev/core";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  type CardProps,
  type LayoutProps,
  Divider,
  type FormProps,
  theme,
} from "antd";
import { useLogin, useTranslate } from "@refinedev/core";

import {
  bodyStyles,
  containerStyles,
  headStyles,
  layoutStyles,
  titleStyles,
} from "../styles";
import { ThemedTitle } from "@components";

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
  mutationVariables,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<LoginFormTypes>();
  const translate = useTranslate();
  const Link = useLink();

  const { mutate: login, isPending } = useLogin<LoginFormTypes>();

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? <ThemedTitle collapsed={false} />}
      </div>
    );

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {translate("pages.login.title", "Sign in to your account")}
    </Typography.Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  login({
                    ...mutationVariables,
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          {!hideForm && (
            <Divider>
              <Typography.Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {translate("pages.login.divider", "or")}
              </Typography.Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      styles={{
        header: headStyles,
        body: bodyStyles,
      }}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      {!hideForm && (
        <Form<LoginFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => login({ ...values, ...mutationVariables })}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
          {...formProps}
        >
          <Form.Item
            name="email"
            label={translate("pages.login.fields.email", "Email")}
            rules={[
              {
                required: true,
                message: translate(
                  "pages.login.errors.requiredEmail",
                  "Email is required",
                ),
              },
              {
                type: "email",
                message: translate(
                  "pages.login.errors.validEmail",
                  "Invalid email address",
                ),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={translate("pages.login.fields.email", "Email")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate("pages.login.fields.password", "Password")}
            rules={[
              {
                required: true,
                message: translate(
                  "pages.login.errors.requiredPassword",
                  "Password is required",
                ),
              },
            ]}
          >
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="●●●●●●●●"
              size="large"
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            {rememberMe ?? (
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {translate("pages.login.buttons.rememberMe", "Remember me")}
                </Checkbox>
              </Form.Item>
            )}
            {forgotPasswordLink ?? (
              <Link
                style={{
                  color: token.colorPrimaryTextHover,
                  fontSize: "12px",
                  marginLeft: "auto",
                }}
                to="/forgot-password"
              >
                {translate(
                  "pages.login.buttons.forgotPassword",
                  "Forgot password?",
                )}
              </Link>
            )}
          </div>
          {!hideForm && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isPending}
                block
              >
                {translate("pages.login.signin", "Sign in")}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}

      {registerLink ?? (
        <div
          style={{
            marginTop: hideForm ? 16 : 8,
          }}
        >
          <Typography.Text style={{ fontSize: 12 }}>
            {translate(
              "pages.login.buttons.noAccount",
              "Don’t have an account?",
            )}{" "}
            <Link
              to="/register"
              style={{
                fontWeight: "bold",
                color: token.colorPrimaryTextHover,
              }}
            >
              {translate("pages.login.signup", "Sign up")}
            </Link>
          </Typography.Text>
        </div>
      )}
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align={hideForm ? "top" : "middle"}
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: hideForm ? "15dvh" : "16px",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
