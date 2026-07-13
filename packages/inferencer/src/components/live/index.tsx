import React from "react";
import * as RefineCore from "@refinedev/core";
import * as gql from "graphql-tag";

import { LivePreview, LiveProvider, LiveContext } from "react-live";

import { replaceImports, replaceExports } from "../../utilities";
import type { AdditionalScopeType, LiveComponentProps } from "../../types";

const defaultScope: Array<AdditionalScopeType> = [
  ["react", "React", React],
  ["@refinedev/core", "RefineCore", RefineCore],
  ["graphql-tag", "GraphqlTag", gql],
];

/**
 * Live Component will render the code with `react-live`.
 * Errors will be handled by `ErrorComponent`.
 */
export const LiveComponent: React.FC<LiveComponentProps> = ({
  fetchError,
  code,
  additionalScope,
  errorComponent: ErrorComponent,
}) => {
  const sanitized =
    (code &&
      replaceExports(
        replaceImports(
          code,
          [...defaultScope, ...(additionalScope ?? [])].reduce(
            (acc, [packageName, variableName, _module, ignoreReplacement]) => {
              if (ignoreReplacement) {
                return acc;
              }
              return {
                ...acc,
                [packageName]: variableName,
              };
            },
            {},
          ),
        ),
      )) ??
    "";

  const scope = React.useMemo(() => {
    return {
      React,
      ...React,
      ...[...defaultScope, ...(additionalScope ?? [])].reduce(
        (acc, [_packageName, variableName, packageContent]) => {
          return {
            ...acc,
            [variableName]: packageContent,
          };
        },
        {},
      ),
    };
  }, [additionalScope]);

  const ErrorComponentWithError = React.useMemo(() => {
    const LiveErrorComponent = () => {
      const { error } = React.useContext(LiveContext);

      if (ErrorComponent) {
        return (
          <ErrorComponent
            error={
              error
                ? `<p>An error occured while rendering the generated component.You can check the generated code from the below "Show Code" button and fix the error manually.</p>
                                    <p>If you think this is a bug, please report the issue at <a target="_blank" rel="noopener noreferrer" href="https://github.com/refinedev/refine/issues">https://github.com/refinedev/refine/issues</a></p>
                                    <p>Exception:</p>
                                    <code>${error}</code>`
                : typeof fetchError === "string"
                  ? fetchError
                  : fetchError
                    ? `<p>Something went wrong while fetching the resource data.</p>
                                    <p>To learn more about the Inferencer, please check the <a href="https://refine.dev/docs/packages/documentation/inferencer/" target="_blank">documentation</a>.</p>`
                    : undefined
            }
          />
        );
      }

      return null;
    };

    return LiveErrorComponent;
  }, [ErrorComponent, fetchError]);

  return (
    <LiveProvider code={sanitized} scope={scope} noInline>
      {!fetchError && <LivePreview />}
      <ErrorComponentWithError />
    </LiveProvider>
  );
};
