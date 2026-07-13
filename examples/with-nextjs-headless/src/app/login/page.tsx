import { AuthPage } from "@refinedev/core";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return (
    <div>
      <AuthPage type="login" />
      <div>
        <p>Email: admin@refine.dev</p>
        <p>Password: 123456</p>
      </div>
    </div>
  );
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
