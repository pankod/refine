import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MuiLink from "@mui/material/Link";

import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";

import type {
  ForgotPasswordFormTypes,
  ForgotPasswordPageProps,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";

import {
  type BaseRecord,
  type HttpError,
  useForgotPassword,
  useLink,
  useTranslate,
} from "@refinedev/core";

import { ThemedTitle } from "@components";
import type { FormPropsType } from "../../index";
import { layoutStyles, titleStyles } from "../styles";

type ForgotPasswordProps = ForgotPasswordPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

/**
 * The forgotPassword type is a page that allows users to reset their passwords. You can use this page to reset your password.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#forgot-password} for more details.
 */
export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  mutationVariables,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, ForgotPasswordFormTypes>({
    ...useFormProps,
  });

  const { mutate, isPending } = useForgotPassword<ForgotPasswordFormTypes>();
  const translate = useTranslate();
  const Link = useLink();

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
        {title ?? (
          <ThemedTitle
            collapsed={false}
            wrapperStyles={{
              gap: "8px",
            }}
          />
        )}
      </div>
    );

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
          fontWeight={700}
        >
          {translate("pages.forgotPassword.title", "Forgot your password?")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return mutate({ ...mutationVariables, ...data });
          })}
        >
          <TextField
            {...register("email", {
              required: translate(
                "pages.forgotPassword.errors.requiredEmail",
                "Email is required",
              ),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translate(
                  "pages.register.errors.validEmail",
                  "Invalid email address",
                ),
              },
            })}
            id="email"
            margin="normal"
            fullWidth
            label={translate("pages.forgotPassword.fields.email", "Email")}
            name="email"
            type="email"
            error={!!errors.email}
            autoComplete="email"
            sx={{
              m: 0,
            }}
          />
          {loginLink ?? (
            <Box textAlign="right" sx={{ mt: "24px" }}>
              <Typography variant="body2" component="span" fontSize="12px">
                {translate(
                  "pages.forgotPassword.buttons.haveAccount",
                  translate(
                    "pages.register.buttons.haveAccount",
                    "Have an account? ",
                  ),
                )}
              </Typography>{" "}
              <MuiLink
                variant="body2"
                component={Link as any}
                underline="none"
                to="/login"
                fontWeight="bold"
                fontSize="12px"
                color="primary.light"
              >
                {translate(
                  "pages.forgotPassword.signin",
                  translate("pages.login.signin", "Sign in"),
                )}
              </MuiLink>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: "24px" }}
            disabled={isPending}
          >
            {translate(
              "pages.forgotPassword.buttons.submit",
              "Send reset instructions",
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100dvh",
            padding: "16px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {renderContent ? (
            renderContent(Content, PageTitle)
          ) : (
            <>
              {PageTitle}
              {Content}
            </>
          )}
        </Container>
      </Box>
    </>
  );
};
