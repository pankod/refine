import { NavigateToResource } from "@refinedev/remix-router";

/**
 * Since we don't have any routes for the index page, we're redirecting the user to the first resource.
 *
 * This can also be done using the `loader` function and `redirect`.
 */
export default function Index() {
  return <NavigateToResource resource="blog_posts" />;
}
