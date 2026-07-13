import type { Express } from "express";
import path from "path";

export const serveOpenInEditor = (app: Express, basePath: string) => {
  app.get("/open-in-editor/*", (req, res) => {
    const { line, column } = req.query;

    const filePath = req.path.replace("/open-in-editor", "");

    const vscodeUrl = `vscode://file/${path.join(basePath, filePath)}?${
      line ? `line=${line}` : ""
    }${column ? `&column=${column}` : ""}`;

    res.redirect(vscodeUrl);
  });
};
