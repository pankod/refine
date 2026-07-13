import authOptions from "@app/api/auth/[...nextauth]/options";
import { AuthPage } from "@components/auth-page";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Login() {
  const data = await getData();

  if (data.session?.user) {
    return redirect("/");
  }

  return (
    <AuthPage
      type="login"
      registerLink={false}
      forgotPasswordLink={false}
      rememberMe={false}
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
    />
  );
}

async function getData() {
  const session = await getServerSession(authOptions);

  return {
    session,
  };
}
