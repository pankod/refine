import { Plugin } from "@docusaurus/types";
import path from "path";

export default function plugin(): Plugin {
  return {
    name: "docusaurus-plugin-refine-tutorial-navigation",
    configureWebpack(config) {
      return {
        resolve: {
          alias: {
            "@tutorial-navigation": path.join(
              config.resolve?.alias?.["@generated"],
              "docusaurus-plugin-refine-tutorial-navigation",
              "default",
            ),
          },
        },
      };
    },
    getPathsToWatch() {
      return [path.join(__dirname, "../tutorials.js")];
    },
    async loadContent() {
      const tutorials = await import("../tutorials.js");

      return tutorials.tutorial;
    },
    async contentLoaded({ content, allContent, actions }): Promise<void> {
      const { createData } = actions;

      await createData(
        `tutorial-navigation-data.json`,
        JSON.stringify(content),
      );
    },
  };
}
