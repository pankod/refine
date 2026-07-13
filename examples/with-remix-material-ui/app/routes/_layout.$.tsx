import { ErrorComponent } from "@refinedev/mui";

/**
 * We're using a splat route to catch all routes that don't match any other route and render the `ErrorComponent` as 404 page.
 */
export default function Index() {
  return <ErrorComponent />;
}
