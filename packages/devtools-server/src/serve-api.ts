import type { Express } from "express";
import { json } from "express";
import uniq from "lodash/uniq";
import type {
  AvailablePackageType,
  Feed,
  PackageType,
} from "@refinedev/devtools-shared";

import type { Data } from "./create-db";
import { getFeed } from "./feed/get-feed";
import { getAllPackages } from "./packages/get-all-packages";
import { getAvailablePackages } from "./packages/get-available-packages";
import { updatePackage } from "./packages/update-package";
import { getLatestPackageData } from "./packages/get-latest-package-data";

export const serveApi = (app: Express, db: Data) => {
  app.use("/api", json());

  app.get("/api/connected-app", (_, res) => {
    res.json({ url: db.connectedApp });
  });

  app.get("/api/activities", (req, res) => {
    const { offset = 0, limit = db.activities.length } = req.query;

    res.setHeader("x-total-count", db.activities.length);

    res.json({
      data: db.activities.slice(Number(offset), Number(limit)),
    });
  });

  app.get("/api/activities/reset", (_, res) => {
    db.activities = [];
    res.json({ success: true });
  });

  app.get("/api/unique-trace-items", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );

    const traceItems = db.activities.flatMap(
      (activity) =>
        activity.trace?.map((t) => t.function).filter(Boolean) ?? [],
    ) as string[];
    const uniqueTraceItems = uniq(traceItems);

    res.setHeader("x-total-count", uniqueTraceItems.length);

    res.json({ data: uniqueTraceItems });
  });

  let cachedInstalledPackages: PackageType[] | null = null;
  app.get("/api/installed-packages", async (req, res) => {
    const { force } = req.query ?? {};

    if (!cachedInstalledPackages || force) {
      cachedInstalledPackages = await getAllPackages();
    }

    res.header("x-total-count", `${cachedInstalledPackages.length}`);

    res.json({ data: cachedInstalledPackages });
  });

  let cachedAvailablePackages: AvailablePackageType[] | null = null;
  app.get("/api/available-packages", async (_, res) => {
    if (!cachedAvailablePackages) {
      cachedAvailablePackages = await getAvailablePackages();
    }

    res.header("x-total-count", `${cachedAvailablePackages.length}`);

    res.json({ data: cachedAvailablePackages });
  });

  const cachedLatestPackages = new Map<string, any>();
  app.get("/api/packages/:packageName/latest", async (req, res) => {
    const { packageName } = req.params ?? {};

    if (!packageName) {
      res.status(400).json({ error: "Package name is required" });
      return;
    }

    if (!cachedLatestPackages.has(packageName)) {
      const latest = await getLatestPackageData(packageName);
      cachedLatestPackages.set(packageName, latest);
    }

    return res.json({ data: cachedLatestPackages.get(packageName) });
  });

  app.post("/api/packages/install", async (req, res) => {
    const { packages } = req.body ?? {};

    if (packages?.length === 0) {
      res.status(400).json({ error: "Package name is required" });
      return;
    }

    const success = await updatePackage(packages as string[]);

    if (success) {
      cachedInstalledPackages = null;
      cachedAvailablePackages = null;
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        error: "Failed to update package",
      });
    }
  });

  let cachedFeed: Feed | null = null;
  app.get("/api/feed", async (req, res) => {
    if (!cachedFeed) {
      cachedFeed = await getFeed();
    }

    res.header("x-total-count", `${cachedFeed.length}`);

    res.json({ data: cachedFeed });
  });
};
