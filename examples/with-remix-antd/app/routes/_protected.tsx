import { ThemedLayout } from "@refinedev/antd";
import { Outlet } from "@remix-run/react";
import { type LoaderFunctionArgs, redirect } from "@remix-run/node";

import { authProvider } from "~/authProvider";

export default function AuthenticatedLayout() {
  // `<ThemedLayout>` is only applied if the user is authenticated
  return (
    <ThemedLayout>
      <Outlet />
    </ThemedLayout>
  );
}

/**
 * We're checking if the current session is authenticated.
 * If not, we're redirecting the user to the login page.
 * This is applied for all routes that are nested under this layout (_protected).
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const { authenticated, redirectTo } = await authProvider.check(request);

  if (!authenticated) {
    throw redirect(redirectTo ?? "/login");
  }

  return {};
}
