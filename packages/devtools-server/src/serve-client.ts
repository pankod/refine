import express from "express";
import path from "path";

import type { Express } from "express";

export const serveClient = (app: Express) => {
  app.use(express.static(path.join(__dirname, "client")));

  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    if (req.path.startsWith("/open-in-editor")) {
      return next();
    }
    res.status(200).sendFile(path.join(`${__dirname}/client/index.html`));
  });
};
