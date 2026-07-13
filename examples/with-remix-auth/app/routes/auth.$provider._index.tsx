import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticator.authenticate("user-pass", request, {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000/",
  });
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { provider } = params;
  await authenticator.authenticate(provider || "google", request, {
    failureRedirect: "/login",
  });
};
