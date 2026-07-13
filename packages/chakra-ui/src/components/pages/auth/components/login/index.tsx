import React from "react";
import {
  type LoginPageProps,
  type LoginFormTypes,
  useLink,
  useLogin,
  useTranslate,
  type BaseRecord,
  type HttpError,
} from "@refinedev/core";
import {
  Box,
  Heading,
  type BoxProps,
  VStack,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  FormErrorMessage,
  HStack,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from "react-hook-form";

import { layoutProps, cardProps } from "../styles";
import type { FormPropsType } from "../..";
import { ThemedTitle } from "@components";

type LoginProps = LoginPageProps<
  BoxProps,
  BoxProps,
  FormPropsType<LoginFormTypes>
>;

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
  const { onSubmit, ...useFormProps } = formProps || {};

  const { mutate: login } = useLogin<LoginFormTypes>();
  const translate = useTranslate();
  const Link = useLink();
  const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
    ...useFormProps,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <VStack>
            {providers.map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                width="full"
                leftIcon={<>{provider?.icon}</>}
                fontSize="sm"
                onClick={() =>
                  login({
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
        {translate("pages.login.title", "Sign in to your account")}
      </Heading>
      {renderProviders()}
      {!hideForm && (
        <form
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return login({ ...mutationVariables, ...data });
          })}
        >
          <FormControl mt="6" isInvalid={!!errors?.email}>
            <FormLabel htmlFor="email">
              {translate("pages.login.fields.email", "Email")}
            </FormLabel>
            <Input
              id="email"
              autoComplete="current-password"
              placeholder="Email"
              type="text"
              {...register("email", {
                required: translate(
                  "pages.login.errors.requiredEmail",
                  "Email is required",
                ),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: translate(
                    "pages.login.errors.validEmail",
                    "Invalid email address",
                  ),
                },
              })}
            />
            <FormErrorMessage>{`${errors.email?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl mt="6" isInvalid={!!errors?.password}>
            <FormLabel htmlFor="password">
              {translate("pages.login.fields.password", "Password")}
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: translate(
                  "pages.login.errors.requiredPassword",
                  "Password is required",
                ),
              })}
            />
            <FormErrorMessage>{`${errors.password?.message}`}</FormErrorMessage>
          </FormControl>

          {rememberMe ?? (
            <Checkbox {...register("remember")} mt="6">
              {translate("pages.login.buttons.rememberMe", "Remember me")}
            </Checkbox>
          )}

          <Button mt="6" type="submit" width="full" colorScheme="brand">
            {translate("pages.login.signin", "Sign in")}
          </Button>

          <Box mt="6">
            <HStack justifyContent="space-between" fontSize="12px">
              {forgotPasswordLink ?? (
                <ChakraLink
                  as={Link as any}
                  to="/forgot-password"
                  color={importantTextColor}
                >
                  {translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?",
                  )}
                </ChakraLink>
              )}
              {registerLink ?? (
                <Box>
                  <span>
                    {translate(
                      "pages.login.buttons.noAccount",
                      "Don’t have an account?",
                    )}
                  </span>
                  <ChakraLink
                    as={Link as any}
                    to="/register"
                    color={importantTextColor}
                    ml="1"
                    fontWeight="bold"
                  >
                    {translate("pages.login.register", "Sign up")}
                  </ChakraLink>
                </Box>
              )}
            </HStack>
          </Box>
        </form>
      )}

      {hideForm && registerLink !== false && (
        <Box mt={6} textAlign="center">
          <span>
            {translate(
              "pages.login.buttons.noAccount",
              "Don’t have an account?",
            )}
          </span>
          <ChakraLink
            as={Link as any}
            to="/register"
            color={importantTextColor}
            ml="1"
            fontWeight="bold"
          >
            {translate("pages.login.register", "Sign up")}
          </ChakraLink>
        </Box>
      )}
    </Box>
  );

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};
