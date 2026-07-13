import React, { type FC } from "react";

import { CommunityStatsProvider } from "../context/CommunityStats";
import { OrganizationJsonLd } from "@site/src/components/json-ld";

const Root: FC = ({ children }) => {
  return (
    <CommunityStatsProvider>
      <OrganizationJsonLd />
      {children}
    </CommunityStatsProvider>
  );
};

export default Root;
