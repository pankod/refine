import React from "react";
import {
  type ForgotPasswordPageProps,
  type ForgotPasswordFormTypes,
  useLink,
} from "@refinedev/core";
import { useTranslate, useForgotPassword } from "@refinedev/core";
import {
  Box,
  Card,
  Space,
  TextInput,
  Title,
  Anchor,
  Button,
  Text,
  type BoxProps,
  type CardProps,
  Group,
  useMantineTheme,
} from "@mantine/core";

import { ThemedTitle } from "@components";
import { FormContext } from "@contexts/form-context";
import {
  layoutStyles,
  cardStyles,
  titleStyles,
  pageTitleStyles,
} from "../styles";
import type { FormPropsType } from "../..";

type ResetPassworProps = ForgotPasswordPageProps<
  BoxProps,
  CardProps,
  FormPropsType
>;

/**
 * The forgotPassword type is a page that allows users to reset their passwords. You can use this page to reset your password.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#forgot-password} for more details.
 */
export const ForgotPasswordPage: React.FC<ResetPassworProps> = ({
  loginLink,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  mutationVariables,
}) => {
  const theme = useMantineTheme();
  const { useForm, FormProvider } = FormContext;
  const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
  const translate = useTranslate();
  const Link = useLink();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value: any) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate(
              "pages.forgotPassword.errors.validEmail",
              "Invalid email address",
            ),
    },
    ...useFormProps,
  });
  const { getInputProps, onSubmit } = form;

  const { mutate: forgotPassword, isPending } =
    useForgotPassword<ForgotPasswordFormTypes>();

  const PageTitle =
    title === false ? null : (
      <div style={pageTitleStyles}>
        {title ?? <ThemedTitle collapsed={false} />}
      </div>
    );

  const CardContent = (
    <Card style={cardStyles} {...(contentProps ?? {})}>
      <Title
        style={titleStyles}
        color={theme.colorScheme === "dark" ? "brand.5" : "brand.8"}
      >
        {translate("pages.forgotPassword.title", "Forgot your password?")}
      </Title>
      <Space h="lg" />
      <FormProvider form={form}>
        <form
          onSubmit={onSubmit((values: any) => {
            if (onSubmitProp) {
              return onSubmitProp(values);
            }
            return forgotPassword({ ...mutationVariables, ...values });
          })}
        >
          <TextInput
            name="email"
            label={translate("pages.forgotPassword.fields.email", "Email")}
            placeholder={translate(
              "pages.forgotPassword.fields.email",
              "Email",
            )}
            {...getInputProps("email")}
          />

          {loginLink ?? (
            <Group mt="md" position={loginLink ? "left" : "right"}>
              <Text size="xs">
                {translate(
                  "pages.forgotPassword.buttons.haveAccount",
                  translate(
                    "pages.login.forgotPassword.haveAccount",
                    "Have an account? ",
                  ),
                )}{" "}
                <Anchor component={Link as any} to="/login" weight={700}>
                  {translate("pages.forgotPassword.signin", "Sign in")}
                </Anchor>
              </Text>
            </Group>
          )}
          <Button mt="lg" fullWidth size="md" type="submit" loading={isPending}>
            {translate(
              "pages.forgotPassword.buttons.submit",
              "Send reset instructions",
            )}
          </Button>
        </form>
      </FormProvider>
    </Card>
  );

  return (
    <Box style={layoutStyles} {...(wrapperProps ?? {})}>
      {renderContent ? (
        renderContent(CardContent, PageTitle)
      ) : (
        <>
          {PageTitle}
          {CardContent}
        </>
      )}
    </Box>
  );
};
