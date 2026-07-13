import React from "react";
import {
  useTranslate,
  useUpdatePassword,
  type UpdatePasswordFormTypes,
  type UpdatePasswordPageProps,
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
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

import { layoutProps, cardProps } from "../styles";
import type { FormPropsType } from "../..";
import { ThemedTitle } from "@components";

type UpdatePasswordProps = UpdatePasswordPageProps<
  BoxProps,
  BoxProps,
  FormPropsType<UpdatePasswordFormTypes>
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  mutationVariables,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const translate = useTranslate();
  const { mutate } = useUpdatePassword<UpdatePasswordFormTypes>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
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
        {translate("pages.updatePassword.title", "Set New Password")}
      </Heading>
      <form
        onSubmit={handleSubmit((data) => {
          if (onSubmit) {
            return onSubmit(data);
          }

          return mutate({ ...mutationVariables, ...data });
        })}
      >
        <FormControl mb="3" isInvalid={!!errors?.password}>
          <FormLabel htmlFor="password">
            {translate("pages.updatePassword.fields.password", "New Password")}
          </FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: translate(
                "pages.updatePassword.errors.requiredPassword",
                "Password required",
              ),
            })}
          />
          <FormErrorMessage>{`${errors.password?.message}`}</FormErrorMessage>
        </FormControl>

        <FormControl mb="3" isInvalid={!!errors?.confirmPassword}>
          <FormLabel htmlFor="confirmPassword">
            {translate(
              "pages.updatePassword.fields.confirmPassword",
              "Confirm New Password",
            )}
          </FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: translate(
                "pages.updatePassword.errors.requiredConfirmPassword",
                "Confirm password is required",
              ),
              validate: (val: any) => {
                if (watch("password") !== val) {
                  return translate(
                    "pages.updatePassword.errors.confirmPasswordNotMatch",
                    "Passwords do not match",
                  );
                }
                return;
              },
            })}
          />
          <FormErrorMessage>
            {`${errors.confirmPassword?.message}`}
          </FormErrorMessage>
        </FormControl>

        <Button mt="6" type="submit" width="full" colorScheme="brand">
          {translate("pages.updatePassword.buttons.submit", "Update")}
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
