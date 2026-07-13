import React from "react";
import {
  useTranslate,
  useLink,
  useRegister,
  type RegisterPageProps,
  type RegisterFormTypes,
  type BaseRecord,
  type HttpError,
} from "@refinedev/core";
import {
  Box,
  type BoxProps,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

import { layoutProps, cardProps } from "../styles";
import type { FormPropsType } from "../..";
import { ThemedTitle } from "@components";

type RegisterProps = RegisterPageProps<
  BoxProps,
  BoxProps,
  FormPropsType<RegisterFormTypes>
>;

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
  const { onSubmit, ...useFormProps } = formProps || {};

  const Link = useLink();
  const translate = useTranslate();
  const { mutate } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
    ...useFormProps,
  });

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <VStack>
            {providers.map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                fontSize="sm"
                width="full"
                leftIcon={<>{provider?.icon}</>}
                onClick={() =>
                  mutate({
                    ...mutationVariables,
                    providerName: provider.name,
                  })
                }
              >
                {provider.label ?? <label>{provider.label}</label>}
              </Button>
            ))}
          </VStack>
          {!hideForm && <Divider my="6" />}
        </>
      );
    }
    return null;
  };

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
        {translate("pages.register.title", "Sign up for your account")}
      </Heading>
      {renderProviders()}
      {!hideForm && (
        <form
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return mutate({ ...mutationVariables, ...data });
          })}
        >
          <FormControl mt="6" isInvalid={!!errors?.email}>
            <FormLabel htmlFor="email">
              {translate("pages.register.fields.email", "Email")}
            </FormLabel>
            <Input
              id="email"
              type="text"
              placeholder="Email"
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
            />
            <FormErrorMessage>{`${errors.email?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl mt="6" isInvalid={!!errors?.password}>
            <FormLabel htmlFor="password">
              {translate("pages.register.fields.password", "Password")}
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: translate(
                  "pages.register.errors.requiredPassword",
                  "Password is required",
                ),
              })}
            />
            <FormErrorMessage>{`${errors.password?.message}`}</FormErrorMessage>
          </FormControl>

          <Button mt="6" type="submit" width="full" colorScheme="brand">
            {translate("pages.register.buttons.submit", "Sign up")}
          </Button>

          {loginLink ?? (
            <Box
              display="flex"
              justifyContent="flex-end"
              mt="6"
              fontSize="12px"
            >
              <span>
                {translate(
                  "pages.register.buttons.haveAccount",
                  translate(
                    "pages.login.buttons.haveAccount",
                    "Have an account?",
                  ),
                )}
              </span>
              <ChakraLink
                as={Link as any}
                to="/login"
                color={importantTextColor}
                ml="1"
                fontWeight="bold"
              >
                {translate(
                  "pages.register.signin",
                  translate("pages.login.signin", "Sign in"),
                )}
              </ChakraLink>
            </Box>
          )}
        </form>
      )}

      {hideForm && loginLink !== false && (
        <Box mt={6} textAlign="center">
          <span>
            {translate(
              "pages.register.buttons.haveAccount",
              "Have an account?",
            )}
          </span>
          <ChakraLink
            as={Link as any}
            to="/login"
            color={importantTextColor}
            ml="1"
            fontWeight="bold"
          >
            {translate(
              "pages.register.signin",
              translate("pages.login.signin", "Sign in"),
            )}
          </ChakraLink>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      style={{
        ...layoutProps,
        justifyContent: hideForm ? "flex-start" : "center",
        paddingTop: hideForm ? "15dvh" : "16px",
      }}
      {...wrapperProps}
    >
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
