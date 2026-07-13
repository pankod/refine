import { ErrorComponent } from "@refinedev/antd";

/**
 * We're using a splat route to catch all routes that don't match any other route and render the `ErrorComponent` as 404 page.
 */
export default function Index() {
  return <ErrorComponent />;
}

/**
 * We've placed the splat route inside `_protected` group,
 * So, we're redirecting the user to the login page if the current session is not authenticated.
 * If the current session is authenticated, we're rendering the `ErrorComponent` as 404 page and apply the `Layout` as well.
 */
