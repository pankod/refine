/// <reference types="cypress" />
/// <reference types="../../index.d.ts" />

import type { ICategory, IPost } from "../../types";

const HOSTNAME = "iwdfzvfqbtokqetmbmbp.supabase.co";
const BASE_PATH = "/rest/v1";

const getSupabaseIdFromQuery = (query?: Record<string, string | number>) => {
  // supabase uses id in query like this {id: 'eq.1'}
  return (query?.id as string)?.split(".")?.[1];
};

Cypress.Commands.add("interceptSupabaseGETPosts", () => {
  // read posts and categories from fixtures
  let posts: (IPost & {
    categories: ICategory;
  })[] = [];
  let categories: ICategory[] = [];
  cy.fixture("categories").then((categoriesFixture) => {
    categories = categoriesFixture;
  });
  //  transform fixtures to match supabase response
  cy.fixture("posts").then((rawPosts) => {
    posts = rawPosts.map((post) => {
      // in supabase, the category is not object, but in fixture it is
      // because of that, we need to convert it to categoryId
      return Object.assign({}, post, {
        categoryId: post.category.id,
        categories: categories.find(
          (category) => category.id === post.category.id,
        ),
      });
    });
  });

  return cy
    .intercept(
      {
        method: "GET",
        hostname: HOSTNAME,
        pathname: `${BASE_PATH}/blog_posts`,
      },

      (req) => {
        const id = getSupabaseIdFromQuery(req.query);
        if (id) {
          const post = posts.find(
            (post) => post.id.toString() === id.toString(),
          );

          if (!post) {
            return req.reply(404, []);
          }

          return req.reply([post]);
        }

        return req.reply(posts);
      },
    )
    .as("supabaseGetPosts");
});

Cypress.Commands.add("interceptSupabasePOSTPost", () => {
  return cy.fixture("posts").then((posts) =>
    cy
      .intercept(
        {
          method: "POST",
          hostname: HOSTNAME,
          pathname: `${BASE_PATH}/blog_posts`,
        },
        (req) => {
          const merged = Object.assign({}, req.body, {
            id: posts.length + 1,
          });

          return req.reply(merged);
        },
      )
      .as("supabasePostPost"),
  );
});

Cypress.Commands.add("interceptSupabasePATCHPost", () => {
  return cy
    .fixture("posts")
    .then((posts) => {
      return cy.intercept(
        {
          method: "PATCH",
          hostname: HOSTNAME,
          pathname: `${BASE_PATH}/blog_posts`,
        },

        (req) => {
          const id = getSupabaseIdFromQuery(req.query);
          const post = posts.find(
            (post) => post.id.toString() === id.toString(),
          );

          if (!post) {
            return req.reply(404, {});
          }
          const merged = Object.assign({}, post, req.body);
          return req.reply(merged);
        },
      );
    })
    .as("supabasePatchPost");
});

Cypress.Commands.add("interceptSupabaseDELETEPost", () => {
  return cy
    .intercept(
      {
        method: "DELETE",
        hostname: HOSTNAME,
        pathname: `${BASE_PATH}/blog_posts`,
      },
      {},
    )
    .as("supabaseDeletePost");
});

Cypress.Commands.add("interceptSupabaseGETCategories", () => {
  return cy
    .intercept(
      {
        method: "GET",
        hostname: HOSTNAME,
        pathname: `${BASE_PATH}/categories*`,
      },
      { fixture: "categories.json" },
    )
    .as("supabaseGetCategories");
});
