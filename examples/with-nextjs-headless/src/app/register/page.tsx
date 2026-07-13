import { AuthPage } from "@refinedev/core";
import { redirect } from "next/navigation";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";

export default async function RegisterPage() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="register" />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
