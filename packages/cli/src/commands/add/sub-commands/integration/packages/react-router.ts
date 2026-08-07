import { ProjectTypes } from "@definitions/projectTypes";

import type { Integration } from ".";
import { runTransformer } from "../run-transformer";
import { prettifyChoice } from "../utils/prettify-choice";

const id = "react-router";
const name = "React Router";
const incompatiblePackages = ["@remix-run/react", "next"];
const requiredPackages = ["react-router", "@refinedev/react-router"];
const transformerFileName = "react-router";

export const ReactRouterIntegration: Integration = {
  id,
  getChoice: (projectType: ProjectTypes) => {
    const title = "React Router";
    const description = "Setup routing with React Router";
    let disabled;

    if (projectType === ProjectTypes.NEXTJS) {
      disabled = `Can't be used with Next.js. https://nextjs.org/docs/app/building-your-application/routing`;
    }

    if (
      projectType === ProjectTypes.REMIX ||
      projectType === ProjectTypes.REMIX_VITE ||
      projectType === ProjectTypes.REMIX_SPA
    ) {
      disabled = `Can't be used with Remix. https://remix.run/docs/en/main/discussion/routes`;
    }

    return prettifyChoice({
      id,
      title,
      description,
      disabled,
    });
  },
  runTransformer: async () => {
    return await runTransformer({
      incompatiblePackages,
      integrationName: name,
      requiredPackages,
      transformerFileName,
    });
  },
};
