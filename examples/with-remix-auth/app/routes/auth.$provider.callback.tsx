import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/utils/auth.server";

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  const { provider } = params;
  return authenticator.authenticate(provider || "google", request, {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000/",
  });
};
