import type { ProjectTypes } from "../../../../../definitions/projectTypes";
import { AntDesignIntegration } from "./ant-design";
import { ReactRouterIntegration } from "./react-router";

export type IntegrationId = "ant-design" | "react-router";

export interface Integration {
  id: IntegrationId;
  getChoice: (projectType: ProjectTypes) => {
    name: string;
    value: IntegrationId;
    disabled?: string;
  };
  runTransformer: () => Promise<void>;
}

export const availableIntegrations: Integration[] = [
  AntDesignIntegration,
  ReactRouterIntegration,
];
