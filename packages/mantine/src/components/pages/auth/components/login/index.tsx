import React from "react";
import {
  type LoginPageProps,
  type LoginFormTypes,
  useLink,
} from "@refinedev/core";
import { useLogin, useTranslate } from "@refinedev/core";
import {
  Box,
  Card,
  Checkbox,
  PasswordInput,
  Space,
  TextInput,
  Title,
  Anchor,
  Button,
  Text,
  Divider,
  Stack,
  type BoxProps,
  type CardProps,
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

type LoginProps = LoginPageProps<BoxProps, CardProps, FormPropsType>;

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#login} for more details.
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
  const theme = useMantineTheme();
  const { useForm, FormProvider } = FormContext;
  const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
  const translate = useTranslate();
  const Link = useLink();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: {
      email: (value: any) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate("pages.login.errors.validEmail", "Invalid email address"),
      password: (value: any) => value === "",
    },
    ...useFormProps,
  });
  const { onSubmit, getInputProps } = form;

  const { mutate: login, isPending } = useLogin<LoginFormTypes>({});

  const PageTitle =
    title === false ? null : (
      <div style={pageTitleStyles}>
        {title ?? <ThemedTitle collapsed={false} />}
      </div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={8}>
            {providers.map((provider) => {
              return (
                <Button
                  key={provider.name}
                  variant="default"
                  fullWidth
                  leftIcon={provider.icon}
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
          </Stack>
          {!hideForm && (
            <Divider
              my="md"
              labelPosition="center"
              label={translate("pages.login.divider", "or")}
            />
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card style={cardStyles} {...(contentProps ?? {})}>
      <Title
        style={titleStyles}
        color={theme.colorScheme === "dark" ? "brand.5" : "brand.8"}
      >
        {translate("pages.login.title", "Sign in to your account")}
      </Title>
      <Space h="sm" />
      <Space h="lg" />
      {renderProviders()}
      {!hideForm && (
        <FormProvider form={form}>
          <form
            onSubmit={onSubmit((values: any) => {
              if (onSubmitProp) {
                return onSubmitProp(values);
              }
              return login({ ...mutationVariables, ...values });
            })}
          >
            <TextInput
              name="email"
              label={translate("pages.login.fields.email", "Email")}
              placeholder={translate("pages.login.fields.email", "Email")}
              {...getInputProps("email")}
            />
            <PasswordInput
              name="password"
              autoComplete="current-password"
              mt="md"
              label={translate("pages.login.fields.password", "Password")}
              placeholder="●●●●●●●●"
              {...getInputProps("password")}
            />
            <Box
              mt="md"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {rememberMe ?? (
                <Checkbox
                  label={translate(
                    "pages.login.buttons.rememberMe",
                    "Remember me",
                  )}
                  size="xs"
                  {...getInputProps("remember", {
                    type: "checkbox",
                  })}
                />
              )}
              {forgotPasswordLink ?? (
                <Anchor component={Link as any} to="/forgot-password" size="xs">
                  {translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?",
                  )}
                </Anchor>
              )}
            </Box>
            <Button
              mt="md"
              fullWidth
              size="md"
              type="submit"
              loading={isPending}
            >
              {translate("pages.login.signin", "Sign in")}
            </Button>
          </form>
        </FormProvider>
      )}
      {registerLink ?? (
        <Text mt="md" size="xs" align="center">
          {translate("pages.login.buttons.noAccount", "Don’t have an account?")}{" "}
          <Anchor component={Link as any} to="/register" weight={700}>
            {translate("pages.login.signup", "Sign up")}
          </Anchor>
        </Text>
      )}
    </Card>
  );

  return (
    <Box
      style={{
        ...layoutStyles,
        justifyContent: hideForm ? "flex-start" : layoutStyles.justifyContent,
        paddingTop: hideForm ? "15dvh" : layoutStyles.padding,
      }}
      {...(wrapperProps ?? {})}
    >
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
