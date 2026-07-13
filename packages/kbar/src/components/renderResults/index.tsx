import React from "react";
import { type ActionId, KBarResults, useMatches } from "kbar";

import { ResultItem } from "@components";

const groupNameStyle = {
  padding: "8px 16px",
  fontSize: "14px",
  textTransform: "uppercase" as const,
  fontWeight: "bold",
  opacity: 0.5,
};
export const RenderResults: React.FC = () => {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        return typeof item === "string" ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId as ActionId}
          />
        );
      }}
    />
  );
};
