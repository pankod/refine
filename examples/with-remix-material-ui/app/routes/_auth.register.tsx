import { AuthPage } from "@refinedev/mui";

export default function Register() {
  return (
    <AuthPage
      type="register"
      formProps={{
        defaultValues: {
          email: "admin@refine.dev",
          password: "demodemo",
        },
      }}
    />
  );
}
