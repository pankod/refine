import { AuthPage } from "@refinedev/mui";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: {
          email: "demo@refine.dev",
          password: "demodemo",
        },
      }}
    />
  );
};
