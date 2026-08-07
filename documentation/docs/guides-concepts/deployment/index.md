---
title: "Deployment Guide | Best Practices in Refine v5"
display_title: "Deployment"
sidebar_label: "Deployment"
description: "Build Deployment in Refine v5. Learn the key steps. Explore provider for real-world React admin panels. Learn with code examples."
---

Refine being a meta-framework, it does not have a specific deployment configuration on its own.

Refine applications are usually built on top of the following frameworks, and you can follow their deployment guides to deploy your application.

- [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
- [Next.js deployment guide](https://nextjs.org/docs/deployment)
- [Remix deployment guide](https://remix.run/docs/en/main/guides/deployment)

For convenience, we've created a [refinedev/Dockerfiles](https://github.com/refinedev/dockerfiles) GitHub repository that contains Dockerfiles for each of the frameworks above.

These Dockerfiles are derived from their respective official Dockerfile examples, using [refinedev/node](https://hub.docker.com/r/refinedev/node) as base image, which has a `non-root` `refine:nodejs` user.

The final stage is running the application as `non-root` `refine:nodejs` user for better **security** and only includes necessary production dependencies for smaller image size.
