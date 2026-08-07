import React from "react";
import type {
  UpdatePasswordPageProps,
  UpdatePasswordFormTypes,
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
  theme,
} from "antd";
import { useTranslate, useUpdatePassword } from "@refinedev/core";

import {
  layoutStyles,
  containerStyles,
  titleStyles,
  headStyles,
  bodyStyles,
} from "../styles";
import { ThemedTitle } from "@components";

type UpdatePasswordProps = UpdatePasswordPageProps<
  LayoutProps,
  CardProps,
  FormProps
>;

/**
 * **refine** has update password page form which is served on `/update-password` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  mutationVariables,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<UpdatePasswordFormTypes>();
  const translate = useTranslate();
  const { mutate: updatePassword, isPending } =
    useUpdatePassword<UpdatePasswordFormTypes>();

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
      {translate("pages.updatePassword.title", "Set New Password")}
    </Typography.Title>
  );

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
      <Form<UpdatePasswordFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) =>
          updatePassword({ ...values, ...mutationVariables })
        }
        requiredMark={false}
        {...formProps}
      >
        <Form.Item
          name="password"
          label={translate(
            "pages.updatePassword.fields.password",
            "New Password",
          )}
          rules={[
            {
              required: true,
              message: translate(
                "pages.updatePassword.errors.requiredPassword",
                "Password is required",
              ),
            },
          ]}
          style={{ marginBottom: "12px" }}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={translate(
            "pages.updatePassword.fields.confirmPassword",
            "Confirm New Password",
          )}
          hasFeedback
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: translate(
                "pages.updatePassword.errors.requiredConfirmPassword",
                "Confirm password is required",
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    translate(
                      "pages.updatePassword.errors.confirmPasswordNotMatch",
                      "Passwords do not match",
                    ),
                  ),
                );
              },
            }),
          ]}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
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
            {translate("pages.updatePassword.buttons.submit", "Update")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
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
