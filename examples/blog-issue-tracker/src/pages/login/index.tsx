import React from "react";
import { AuthPage } from "@refinedev/antd";

export const Login: React.FC = () => {
  return (
    <AuthPage
      type="login"
      forgotPasswordLink={false}
      formProps={{
        initialValues: {
          email: "info@refine.dev",
          password: "refine-supabase",
        },
      }}
    />
  );
};
