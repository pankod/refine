import React from "react";
import {
  type RegisterPageProps,
  type RegisterFormTypes,
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
  type LayoutProps,
  type CardProps,
  type FormProps,
  Divider,
  theme,
} from "antd";
import { useTranslate, useRegister } from "@refinedev/core";

import {
  layoutStyles,
  containerStyles,
  titleStyles,
  headStyles,
  bodyStyles,
} from "../styles";
import { ThemedTitle } from "@components";

type RegisterProps = RegisterPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  hideForm,
  mutationVariables,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<RegisterFormTypes>();
  const translate = useTranslate();
  const Link = useLink();

  const { mutate: register, isPending } = useRegister<RegisterFormTypes>();

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
      {translate("pages.register.title", "Sign up for your account")}
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
                  register({
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
                {translate(
                  "pages.register.divider",
                  translate("pages.login.divider", "or"),
                )}
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
        <Form<RegisterFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => register({ ...mutationVariables, ...values })}
          requiredMark={false}
          {...formProps}
        >
          <Form.Item
            name="email"
            label={translate("pages.register.email", "Email")}
            rules={[
              {
                required: true,
                message: translate(
                  "pages.register.errors.requiredEmail",
                  "Email is required",
                ),
              },
              {
                type: "email",
                message: translate(
                  "pages.register.errors.validEmail",
                  "Invalid email address",
                ),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={translate("pages.register.fields.email", "Email")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate("pages.register.fields.password", "Password")}
            rules={[
              {
                required: true,
                message: translate(
                  "pages.register.errors.requiredPassword",
                  "Password is required",
                ),
              },
            ]}
          >
            <Input type="password" placeholder="●●●●●●●●" size="large" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            {loginLink ?? (
              <Typography.Text
                style={{
                  fontSize: 12,
                  marginLeft: "auto",
                }}
              >
                {translate(
                  "pages.register.buttons.haveAccount",
                  translate(
                    "pages.login.buttons.haveAccount",
                    "Have an account?",
                  ),
                )}{" "}
                <Link
                  style={{
                    fontWeight: "bold",
                    color: token.colorPrimaryTextHover,
                  }}
                  to="/login"
                >
                  {translate(
                    "pages.register.signin",
                    translate("pages.login.signin", "Sign in"),
                  )}
                </Link>
              </Typography.Text>
            )}
          </div>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isPending}
              block
            >
              {translate("pages.register.buttons.submit", "Sign up")}
            </Button>
          </Form.Item>
        </Form>
      )}
      {hideForm && loginLink !== false && (
        <div
          style={{
            marginTop: hideForm ? 16 : 8,
          }}
        >
          <Typography.Text
            style={{
              fontSize: 12,
            }}
          >
            {translate(
              "pages.register.buttons.haveAccount",
              translate("pages.login.buttons.haveAccount", "Have an account?"),
            )}{" "}
            <Link
              style={{
                fontWeight: "bold",
                color: token.colorPrimaryTextHover,
              }}
              to="/login"
            >
              {translate(
                "pages.register.signin",
                translate("pages.login.signin", "Sign in"),
              )}
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
