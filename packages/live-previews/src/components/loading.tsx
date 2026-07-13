import React from "react";

export const Loading: React.FC<{ loading?: boolean }> = ({ loading }) => {
  return (
    <div
      className="refine-loading__overlay"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        animationIterationCount: loading ? 0 : 1,
        animationDuration: "200ms",
      }}
    >
      <img src="/loader.gif" className="refine-loading__gif" />
    </div>
  );
};
