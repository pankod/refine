import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: {
          email: "demo@refine.dev",
          password: "demodemo",
        },
      }}
    />
  );
};
