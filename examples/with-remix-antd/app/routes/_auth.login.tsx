import { AuthPage } from "@refinedev/antd";

export default function Login() {
  return (
    <AuthPage
      formProps={{
        initialValues: {
          email: "admin@refine.dev",
          password: "password",
        },
      }}
    />
  );
}
