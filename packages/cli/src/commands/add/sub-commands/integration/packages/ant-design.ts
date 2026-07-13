import { ProjectTypes } from "@definitions/projectTypes";

import type { Integration } from ".";
import { runTransformer } from "../run-transformer";
import { prettifyChoice } from "../utils/prettify-choice";

const id = "ant-design";
const name = "Ant Design";
const incompatiblePackages = ["@remix-run/react", "next"];
const requiredPackages = ["antd", "@refinedev/antd"];
const transformerFileName = "ant-design";

export const AntDesignIntegration: Integration = {
  id,
  getChoice: (projectType: ProjectTypes) => {
    const title = "Ant Design";
    const description = "Setup Ant Design with Refine";
    let disabled;

    if (
      [
        ProjectTypes.NEXTJS,
        ProjectTypes.REMIX,
        ProjectTypes.REMIX_VITE,
        ProjectTypes.REMIX_SPA,
      ].includes(projectType)
    ) {
      disabled =
        "Automatic setup only available Vite for now. See the documentation for manual installation: https://refine.dev/docs/ui-integrations/ant-design/introduction/#installation";
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
