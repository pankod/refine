import React from "react";
import { LiveContext } from "react-live";

export const LiveError: React.FC = () => {
  const { error } = React.useContext(LiveContext);

  if (error) {
    return (
      <div className="page__wrapper">
        <div className="page__content">
          <h2 style={{ marginBottom: "1rem" }}>Error :(</h2>
          <p className="live-error__description">{error}</p>
          <a href="https://refine.dev" target="_blank" rel="noreferrer">
            Visit Refine
          </a>
        </div>
      </div>
    );
  }

  return null;
};
