import { AuthPage } from "@refinedev/antd";
import { Form } from "antd";

export default function Login() {
  const [form] = Form.useForm();

  return (
    <AuthPage
      providers={[
        {
          name: "google",
          label: "with Google",
        },
        {
          name: "auth0",
          label: "with Auth0",
        },
        {
          name: "keycloak",
          label: "with Keycloak",
        },
      ]}
      formProps={{
        method: "post",
        id: "login-form",
        form: form,
        action: "/auth/user-pass",
        initialValues: {
          email: "demo@refine.dev",
          password: "demodemo",
        },
        async onFinish() {
          form.validateFields().then(() => {
            (document.getElementById("login-form") as HTMLFormElement).submit();
          });
        },
      }}
    />
  );
}
