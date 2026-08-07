import React from "react";

import type { NextPage } from "next";
import { LivePreview, LiveProvider } from "react-live";

import Error from "@/pages/_error";
import { Loading } from "@/src/components/loading";
import { LiveError } from "@/src/components/live-error";

import { RefineCommonScope } from "@/src/scope/common";
import { replaceImports } from "@/src/utils/replace-imports";
import { useCode } from "@/src/utils/use-code";
import { checkPackage } from "@/src/utils/check-package";

const Preview: NextPage = () => {
  const [ready, setReady] = React.useState(false);
  const {
    code,
    css,
    hasQuery,
    isReady,
    disableScroll,
    useTailwind,
    isLoading,
  } = useCode();
  const [scope, setScope] = React.useState({ ...RefineCommonScope });
  const [scopeSettled, setScopeSettled] = React.useState(false);

  const scopeResolver = React.useCallback(async () => {
    if (code && hasQuery && isReady && !scopeSettled) {
      const usedPackages = checkPackage(code);

      const callbacks: (() => Promise<{}>)[] = Array.from(usedPackages).map(
        (scope) => async () => (await import(`../src/scope/${scope}`)).default,
      );

      if (code.includes("React.createElement(GoogleButton,")) {
        callbacks.push(
          async () => (await import(`${"../src/scope/google"}`)).default,
        );
      }

      let scopesToUse: Record<string, any> = {};

      const resolvedScopes = await Promise.all(callbacks.map((cb) => cb()));

      resolvedScopes.forEach((scope) => {
        scopesToUse = {
          ...scopesToUse,
          ...scope,
        };
      });

      setScope({
        ...RefineCommonScope,
        ...scopesToUse,
      });
      setScopeSettled(true);
    }
  }, [code, hasQuery, isReady, scopeSettled]);

  React.useEffect(() => {
    scopeResolver();
  }, [scopeResolver]);

  if (isReady && !hasQuery) {
    return <Error statusCode={404} />;
  }

  if (isReady && hasQuery && !code && !isLoading) {
    return <Error statusCode={400} />;
  }

  if (isReady && code && typeof window !== "undefined" && !ready) {
    const pkgs = checkPackage(code);

    const hasAntd = pkgs.has("antd") || pkgs.has("antd-inferencer");

    if (hasAntd || useTailwind) {
      if (hasAntd) {
        const element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.onload = () => {
          setTimeout(() => {
            setReady(true);
          }, 300);
        };
        element.setAttribute(
          "href",
          "https://refine.ams3.cdn.digitaloceanspaces.com/antd%2Fdist%2Freset.css",
        );
        document.head.appendChild(element);
      }
      if (useTailwind) {
        const element = document.createElement("script");
        element.setAttribute("defer", "true");
        element.onload = () => {
          setTimeout(() => {
            setReady(true);
          }, 300);
        };
        element.setAttribute("src", "https://cdn.tailwindcss.com");
        document.head.appendChild(element);
      }
    } else {
      setReady(true);
    }
  }

  return (
    <>
      <style jsx global>
        {`
                    body {
                        overflow: ${
                          disableScroll ? "hidden !important" : "auto"
                        };
                    }
                    ${css ?? ""}
                `}
      </style>
      <Loading loading={!ready || !scopeSettled} />
      {ready && scopeSettled && (
        <LiveProvider scope={scope} noInline code={replaceImports(code ?? "")}>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      )}
    </>
  );
};

export default Preview;
