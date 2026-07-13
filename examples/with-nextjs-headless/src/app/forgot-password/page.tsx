import { AuthPage } from "@refinedev/core";
import { redirect } from "next/navigation";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";

export default async function ForgotPasswordPage() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="forgotPassword" />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
