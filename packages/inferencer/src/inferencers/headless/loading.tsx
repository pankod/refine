import React from "react";

import type { CreateInferencerConfig } from "../../types";

export const LoadingComponent: CreateInferencerConfig["loadingComponent"] =
  () => {
    const [dots, setDots] = React.useState(0);

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        const interval = setInterval(() => {
          setDots((dots) => {
            if (dots === 3) {
              return 0;
            }
            return dots + 1;
          });
        }, 300);

        return () => {
          clearInterval(interval);
        };
      }

      return () => undefined;
    }, []);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "120px",
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
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            loading{".".repeat(dots)}
          </span>
        </div>
      </div>
    );
  };
