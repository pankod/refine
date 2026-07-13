import type { CyHttpMessages } from "cypress/types/net-stubbing";
import hasuraBlogPosts from "../../../fixtures/hasura-blog-posts.json";
import hasuraCategories from "../../../fixtures/hasura-categories.json";

type Operation = "get" | "getAll" | "create" | "update" | "delete";

export const getOperation = (
  req: CyHttpMessages.IncomingHttpRequest,
): Operation | null => {
  const query = req.body.query as string;

  if (query.startsWith("query")) {
    if (query.includes("aggregate") || query.includes("$where")) {
      return "getAll";
    }

    if (query.includes("by_pk")) {
      return "get";
    }
  }

  if (query.startsWith("mutation")) {
    if (query.includes("delete")) {
      return "delete";
    }

    if (query.includes("$_set")) {
      return "update";
    }

    if (query.includes("insert")) {
      return "create";
    }
  }

  return null;
};

const getResource = (req: CyHttpMessages.IncomingHttpRequest) => {
  const query = req.body.query as string;

  if (query.includes("blog_posts")) {
    return "BlogPosts";
  }

  if (query.includes("categories")) {
    return "Categories";
  }

  return null;
};

Cypress.Commands.add("interceptHasura", () => {
  return cy.intercept(
    {
      method: "POST",
      hostname: "flowing-mammal-24.hasura.app",
      pathname: "/v1/graphql",
    },
    (req) => {
      const body = req.body;
      const operation = getOperation(req);
      const resource = getResource(req);
      const alias = `${operation}${resource}`;
      console.log({ alias, body });

      if (!operation || !resource) {
        console.log("no operation or resource", {
          operation,
          resource,
        });
        return req.reply(404, {});
      }

      req.alias = alias;

      if (resource === "BlogPosts") {
        if (operation === "getAll") {
          return req.reply({
            data: hasuraBlogPosts.data,
          });
        }

        if (operation === "get") {
          const id = body.variables.id;
          const { category: _category, ...post } =
            hasuraBlogPosts.data.blog_posts.find(
              (post) => post.id === id,
            ) as any;

          if (!post) {
            return req.reply(404, {});
          }

          return req.reply({
            data: {
              blog_posts_by_pk: post,
            },
          });
        }

        if (operation === "update") {
          return req.reply({
            data: {
              update_blog_posts_by_pk: body.variables._set,
            },
          });
        }

        if (operation === "delete") {
          return req.reply({
            data: {
              delete_blog_posts_by_pk: {
                id: body.variables.id,
              },
            },
          });
        }
      }

      if (resource === "Categories") {
        if (operation === "getAll") {
          return req.reply({
            data: hasuraCategories.data,
          });
        }

        if (operation === "get") {
          const id = body.variables.id;
          const category = hasuraCategories.data.categories.find(
            (category) => category.id === id,
          );

          if (!category) {
            console.log("no category found", {
              id,
              category,
            });
            return req.reply(404, {});
          }

          return req.reply({
            data: {
              categories_by_pk: category,
            },
          });
        }
      }
    },
  );
});
