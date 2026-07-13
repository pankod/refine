import * as React from "react";
import {
  type UpdatePasswordFormTypes,
  type UpdatePasswordPageProps,
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

import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";

import {
  type BaseRecord,
  type HttpError,
  useTranslate,
  useUpdatePassword,
} from "@refinedev/core";

import { layoutStyles, titleStyles } from "../styles";
import type { FormPropsType } from "../../index";
import { ThemedTitle } from "@components";

type UpdatePasswordProps = UpdatePasswordPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
  mutationVariables,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
    ...useFormProps,
  });

  const { mutate: update, isPending } =
    useUpdatePassword<UpdatePasswordFormTypes>();

  const translate = useTranslate();

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
          {translate("pages.updatePassword.title", "Set New Password")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return update({ ...mutationVariables, ...data });
          })}
        >
          <TextField
            {...register("password", {
              required: translate(
                "pages.updatePassword.errors.requiredPassword",
                "Password required",
              ),
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate(
              "pages.updatePassword.fields.password",
              "New Password",
            )}
            helperText={errors?.password?.message}
            error={!!errors?.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              m: 0,
            }}
          />

          <TextField
            {...register("confirmPassword", {
              required: translate(
                "pages.updatePassword.errors.requiredConfirmPassword",
                "Confirm Password is required",
              ),
              validate: (value?: string) => {
                if (watch("password") !== value) {
                  return translate(
                    "pages.updatePassword.errors.confirmPasswordNotMatch",
                    "Passwords do not match",
                  );
                }
                return true;
              },
            })}
            id="confirmPassword"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label={translate(
              "pages.updatePassword.fields.confirmPassword",
              "Confirm New Password",
            )}
            helperText={errors?.confirmPassword?.message}
            error={!!errors?.confirmPassword}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-confirm-password"
            sx={{
              mb: 0,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: "24px",
            }}
            disabled={isPending}
          >
            {translate("pages.updatePassword.buttons.submit", "Update")}
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
