/// <reference types="cypress" />
/// <reference types="../../index.d.ts" />

import { getIdFromURL } from "../../../utils";

const hostname = "api.fake-rest.refine.dev";

Cypress.Commands.add("interceptGETPosts", () => {
  return cy
    .intercept(
      {
        method: "GET",
        hostname: hostname,
        pathname: "/posts",
      },
      {
        fixture: "posts.json",
      },
    )
    .as("getPosts");
});

Cypress.Commands.add("interceptGETPost", () => {
  return cy
    .fixture("posts")
    .then((posts) => {
      return cy.intercept(
        {
          method: "GET",
          hostname: hostname,
          pathname: "/posts/*",
        },

        (req) => {
          const id = getIdFromURL(req.url);
          const post = posts.find((post) => post.id === id);

          if (!post) {
            req.reply(404, {});
            return;
          }

          req.reply(post);
        },
      );
    })
    .as("getPost");
});

Cypress.Commands.add("interceptPOSTPost", () => {
  return cy.fixture("posts").then((posts) =>
    cy
      .intercept(
        {
          method: "POST",
          hostname: hostname,
          pathname: "/posts",
        },
        (req) => {
          const merged = Object.assign({}, req.body, {
            id: posts.length + 1,
          });

          return req.reply(merged);
        },
      )
      .as("postPost"),
  );
});

Cypress.Commands.add("interceptPATCHPost", () => {
  return cy
    .fixture("posts")
    .then((posts) => {
      return cy.intercept(
        {
          method: "PATCH",
          hostname: hostname,
          pathname: "/posts/*",
        },

        (req) => {
          const id = getIdFromURL(req.url);
          const post = posts.find((post) => post.id === id);

          if (!post) {
            return req.reply(404, {});
          }
          const merged = Object.assign({}, post, req.body);
          return req.reply(merged);
        },
      );
    })
    .as("patchPost");
});

Cypress.Commands.add("interceptDELETEPost", () => {
  return cy
    .intercept(
      {
        method: "DELETE",
        hostname: hostname,
        pathname: "/posts/*",
      },
      {},
    )
    .as("deletePost");
});

Cypress.Commands.add("interceptGETCategories", () => {
  return cy
    .intercept(
      {
        method: "GET",
        hostname: hostname,
        pathname: "/categories",
      },
      { fixture: "categories.json" },
    )
    .as("getCategories");
});

Cypress.Commands.add("interceptGETCategory", () => {
  return cy
    .fixture("categories")
    .then((categories) => {
      return cy.intercept(
        {
          method: "GET",
          hostname: hostname,
          pathname: "/categories/*",
        },

        (req) => {
          const id = getIdFromURL(req.url);
          const category = categories.find(
            (category) => category.id.toString() === id.toString(),
          );

          if (!category) {
            req.reply(404, {});
            return;
          }

          req.reply(category);
        },
      );
    })
    .as("getCategory");
});

Cypress.Commands.add("interceptGETBlogPosts", () => {
  return cy
    .intercept(
      {
        method: "GET",
        hostname: hostname,
        pathname: "/blog_posts",
      },
      {
        fixture: "blog-posts.json",
      },
    )
    .as("getBlogPosts");
});

Cypress.Commands.add("interceptGETBlogPost", () => {
  return cy
    .fixture("blog-posts")
    .then((posts) => {
      return cy.intercept(
        {
          method: "GET",
          hostname: hostname,
          pathname: "/blog_posts/*",
        },

        (req) => {
          const id = getIdFromURL(req.url);
          const post = posts.find((post) => post.id === id);

          if (!post) {
            req.reply(404, {});
            return;
          }

          req.reply(post);
        },
      );
    })
    .as("getBlogPost");
});

Cypress.Commands.add("interceptPOSTBlogPost", () => {
  return cy.fixture("blog-posts").then((posts) =>
    cy
      .intercept(
        {
          method: "POST",
          hostname: hostname,
          pathname: "/blog_posts",
        },
        (req) => {
          const merged = Object.assign({}, req.body, {
            id: posts.length + 1,
          });

          return req.reply(merged);
        },
      )
      .as("postBlogPost"),
  );
});

Cypress.Commands.add("interceptPATCHBlogPost", () => {
  return cy
    .fixture("blog-posts")
    .then((posts) => {
      return cy.intercept(
        {
          method: "PATCH",
          hostname: hostname,
          pathname: "/blog_posts/*",
        },

        (req) => {
          const id = getIdFromURL(req.url);
          const post = posts.find((post) => post.id === id);

          if (!post) {
            return req.reply(404, {});
          }
          const merged = Object.assign({}, post, req.body);
          return req.reply(merged);
        },
      );
    })
    .as("patchBlogPost");
});

Cypress.Commands.add("interceptDELETEBlogPost", () => {
  return cy
    .intercept(
      {
        method: "DELETE",
        hostname: hostname,
        pathname: "/blog_posts/*",
      },
      {},
    )
    .as("deleteBlogPost");
});
