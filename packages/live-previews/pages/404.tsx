import React from "react";

export default function FourOhFour(): React.JSX.Element {
  return (
    <div className="page__wrapper">
      <div className="page__content">
        <h1>404</h1>
        <p>
          Looks like the page you are looking for doesn&apos;t exist. Please try
          again.
        </p>
        <a href="https://refine.dev" target="_blank" rel="noreferrer">
          Visit Refine
        </a>
      </div>
    </div>
  );
}
