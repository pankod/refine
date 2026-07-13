import { AuthPage } from "@refinedev/mui";

export default function Login() {
  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: {
          email: "admin@refine.dev",
          password: "demodemo",
        },
      }}
    />
  );
}
