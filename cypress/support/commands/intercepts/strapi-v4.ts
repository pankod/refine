/// <reference types="cypress" />
/// <reference types="../../index.d.ts" />

import { getIdFromURL } from "../../../utils";

const hostname = "api.strapi-v4.refine.dev";
const BASE_PATH = "/api";

Cypress.Commands.add("interceptStrapiV4Login", () => {
  return cy
    .intercept(
      { method: "GET", hostname, pathname: `${BASE_PATH}/me` },
      {
        statusCode: 200,
        body: { id: 1, username: "demo", email: "demo@refine.dev" },
      },
    )
    .as("strapiV4Login");
});

Cypress.Commands.add("interceptStrapiV4GETPosts", () => {
  return cy
    .intercept(
      {
        method: "GET",
        hostname: hostname,
        pathname: `${BASE_PATH}/posts`,
      },
      {
        fixture: "posts.json",
      },
    )
    .as("strapiV4GetPosts");
});

Cypress.Commands.add("interceptStrapiV4GETPost", () => {
  return cy
    .fixture("posts")
    .then((posts) => {
      return cy.intercept(
        {
          method: "GET",
          hostname: hostname,
          pathname: `${BASE_PATH}/posts/*`,
        },

        (req) => {
          const id = getIdFromURL(req.url);
          const post = posts.find(
            (post) => post.id.toString() === id.toString(),
          );

          if (!post) {
            req.reply(404, {});
            return;
          }

          req.reply({
            data: post,
            meta: {},
          });
        },
      );
    })
    .as("strapiV4GetPost");
});

Cypress.Commands.add("interceptStrapiV4POSTPost", () => {
  return cy.fixture("posts").then((posts) =>
    cy
      .intercept(
        {
          method: "POST",
          hostname: hostname,
          pathname: `${BASE_PATH}/posts`,
        },
        (req) => {
          const merged = Object.assign({}, req.body, {
            id: posts.length + 1,
          });

          return req.reply(merged);
        },
      )
      .as("strapiV4PostPost"),
  );
});

Cypress.Commands.add("interceptStrapiV4PUTPost", () => {
  return cy
    .fixture("posts")
    .then((posts) => {
      return cy.intercept(
        {
          method: "PUT",
          hostname: hostname,
          pathname: `${BASE_PATH}/posts/*`,
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
    .as("strapiV4PutPost");
});

Cypress.Commands.add("interceptStrapiV4DELETEPost", () => {
  return cy
    .intercept(
      {
        method: "DELETE",
        hostname: hostname,
        pathname: `${BASE_PATH}/posts/*`,
      },
      {},
    )
    .as("strapiV4DeletePost");
});

Cypress.Commands.add("interceptStrapiV4GETCategories", () => {
  return cy
    .intercept(
      {
        method: "GET",
        hostname: hostname,
        pathname: `${BASE_PATH}/categories`,
      },
      { fixture: "categories.json" },
    )
    .as("strapiV4GetCategories");
});

Cypress.Commands.add("interceptStrapiV4GETCategory", () => {
  return cy
    .fixture("categories")
    .then((categories) => {
      return cy.intercept(
        {
          method: "GET",
          hostname: hostname,
          pathname: `${BASE_PATH}/categories/*`,
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

          req.reply({
            data: category,
          });
        },
      );
    })
    .as("strapiV4GetCategory");
});
