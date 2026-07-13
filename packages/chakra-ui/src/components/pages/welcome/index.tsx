import React from "react";
import { WelcomePage as WelcomePageFromCore } from "@refinedev/core";

/**
 * It is a page that welcomes you after the configuration is completed.
 * @deprecated `WelcomePage` is deprecated. Use `WelcomePage` from `@refinedev/core` instead.
 */
export const WelcomePage: React.FC = () => {
  return <WelcomePageFromCore />;
};
