import * as React from "react";
import {
  type RegisterFormTypes,
  type RegisterPageProps,
  useActiveAuthProvider,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";

import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";

import {
  type BaseRecord,
  type HttpError,
  useTranslate,
  useLink,
  useRegister,
} from "@refinedev/core";

import { layoutStyles, titleStyles } from "../styles";
import type { FormPropsType } from "../../index";
import { ThemedTitle } from "@components";

type RegisterProps = RegisterPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  providers,
  formProps,
  title,
  hideForm,
  mutationVariables,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
    ...useFormProps,
  });

  const { mutate: registerMutate, isPending } =
    useRegister<RegisterFormTypes>();
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

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  onClick={() =>
                    registerMutate({
                      ...mutationVariables,
                      providerName: provider.name,
                    })
                  }
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          {!hideForm && (
            <Divider
              sx={{
                fontSize: "12px",
                marginY: "16px",
              }}
            >
              {translate(
                "pages.register.divider",
                translate("pages.login.divider", "or"),
              )}
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

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
          {translate("pages.register.title", "Sign up for your account")}
        </Typography>
        {renderProviders()}
        {!hideForm && (
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              if (onSubmit) {
                return onSubmit(data);
              }

              return registerMutate({ ...mutationVariables, ...data });
            })}
          >
            <TextField
              {...register("email", {
                required: translate(
                  "pages.register.errors.requiredEmail",
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
              label={translate("pages.register.email", "Email")}
              error={!!errors.email}
              helperText={errors["email"] ? errors["email"].message : ""}
              name="email"
              autoComplete="email"
              sx={{
                mt: 0,
              }}
            />
            <TextField
              {...register("password", {
                required: translate(
                  "pages.register.errors.requiredPassword",
                  "Password is required",
                ),
              })}
              id="password"
              margin="normal"
              fullWidth
              name="password"
              label={translate("pages.register.fields.password", "Password")}
              helperText={errors["password"] ? errors["password"].message : ""}
              error={!!errors.password}
              type="password"
              placeholder="●●●●●●●●"
              autoComplete="current-password"
              sx={{
                mb: 0,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              sx={{
                mt: "24px",
              }}
            >
              {translate("pages.register.signup", "Sign up")}
            </Button>
          </Box>
        )}
        {loginLink ?? (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              mt: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" component="span" fontSize="12px">
              {translate(
                "pages.register.buttons.haveAccount",
                translate(
                  "pages.login.buttons.haveAccount",
                  "Have an account?",
                ),
              )}
            </Typography>
            <MuiLink
              ml="4px"
              variant="body2"
              color="primary"
              component={Link as any}
              underline="none"
              to="/login"
              fontSize="12px"
              fontWeight="bold"
            >
              {translate(
                "pages.register.signin",
                translate("pages.login.signin", "Sign in"),
              )}
            </MuiLink>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: hideForm ? "flex-start" : "center",
          alignItems: "center",
          minHeight: "100dvh",
          padding: "16px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            paddingTop: hideForm ? "15dvh" : 0,
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
        </Box>
      </Container>
    </Box>
  );
};
