import type { NextPageContext } from "next";
import type { ErrorProps } from "next/error";

const Error = ({ statusCode, title }: ErrorProps): React.JSX.Element => {
  const getMessage = () => {
    if (title) {
      return title;
    }
    switch (statusCode) {
      case 404:
        return "Looks like the page you are looking for doesn&apos;t exist. Please try again.";
      case 500:
        return "Something bad happened here. Please try again.";
      case 400:
        return "Unable to process your request. Please try again.";
      default:
        return "An unexpected error has occurred";
    }
  };

  return (
    <div className="page__wrapper">
      <div className="page__content">
        <h1>{statusCode}</h1>
        <p>{getMessage()}</p>
        <a href="https://refine.dev" target="_blank" rel="noreferrer">
          Visit Refine
        </a>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
