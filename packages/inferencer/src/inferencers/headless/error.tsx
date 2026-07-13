import React from "react";

import type { CreateInferencerConfig } from "../../types";

export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
  error,
}) => {
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
            dangerouslySetInnerHTML={{ __html: error ?? "" }}
          />
        </div>
      </div>
    );
  }

  return null;
};
