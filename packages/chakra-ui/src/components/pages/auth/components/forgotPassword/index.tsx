import React from "react";
import {
  useTranslate,
  useLink,
  useForgotPassword,
  type ForgotPasswordFormTypes,
  type ForgotPasswordPageProps,
  type BaseRecord,
  type HttpError,
} from "@refinedev/core";
import {
  Box,
  type BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

import { layoutProps, cardProps } from "../styles";
import type { FormPropsType } from "../..";
import { ThemedTitle } from "@components";

type ForgotPasswordProps = ForgotPasswordPageProps<
  BoxProps,
  BoxProps,
  FormPropsType<ForgotPasswordFormTypes>
>;

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
  const { mutate } = useForgotPassword<ForgotPasswordFormTypes>();
  const translate = useTranslate();
  const Link = useLink();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, ForgotPasswordFormTypes>({
    ...useFormProps,
  });

  const importantTextColor = useColorModeValue("brand.500", "brand.200");

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

  const allContentProps = { ...cardProps, ...contentProps };
  const content = (
    <Box
      bg="chakra-body-bg"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      backgroundColor={useColorModeValue("white", "gray.800")}
      {...allContentProps}
    >
      <Heading
        mb="8"
        textAlign="center"
        fontSize="2xl"
        color={importantTextColor}
      >
        {translate("pages.forgotPassword.title", "Forgot your password?")}
      </Heading>

      <form
        onSubmit={handleSubmit((data) => {
          if (onSubmit) {
            return onSubmit(data);
          }

          return mutate({ ...mutationVariables, ...data });
        })}
      >
        <FormControl mb="3" isInvalid={!!errors?.email}>
          <FormLabel htmlFor="email">
            {translate("pages.forgotPassword.fields.email", "Email")}
          </FormLabel>
          <Input
            id="email"
            type="text"
            {...register("email", {
              required: translate(
                "pages.forgotPassword.errors.requiredEmail",
                "Email is required",
              ),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translate(
                  "pages.forgotPassword.errors.validEmail",
                  translate(
                    "pages.login.errors.validEmail",
                    "Invalid email address",
                  ),
                ),
              },
            })}
          />
          <FormErrorMessage>{`${errors.email?.message}`}</FormErrorMessage>
        </FormControl>

        {loginLink ?? (
          <Box my="6" display="flex" justifyContent="flex-end">
            <span>
              {translate(
                "pages.forgotPassword.buttons.haveAccount",
                translate(
                  "pages.register.buttons.haveAccount",
                  "Have an account?",
                ),
              )}
            </span>
            <ChakraLink
              as={Link as any}
              to="/login"
              color={importantTextColor}
              ml="1"
            >
              {translate(
                "pages.forgotPassword.signin",
                translate("pages.login.signin", "Sign in"),
              )}
            </ChakraLink>
          </Box>
        )}

        <Button mb="3" type="submit" width="full" colorScheme="brand">
          {translate(
            "pages.forgotPassword.buttons.submit",
            "Send reset instructions",
          )}
        </Button>
      </form>
    </Box>
  );

  const allWrapperProps = { ...layoutProps, ...wrapperProps };
  return (
    <Box {...allWrapperProps}>
      {renderContent ? (
        renderContent(content, PageTitle)
      ) : (
        <>
          {PageTitle}
          {content}
        </>
      )}
    </Box>
  );
};
