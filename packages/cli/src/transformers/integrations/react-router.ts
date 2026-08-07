import decamelize from "decamelize";
import type {
  API,
  Collection,
  FileInfo,
  JSCodeshift,
  JSXIdentifier,
} from "jscodeshift";
import {
  addAttributeIfNotExist,
  addOrUpdateImports,
  wrapChildren,
  wrapElement,
} from "../../utils/codeshift";
import { prettierFormat } from "../../utils/swizzle/prettierFormat";

export const parser = "tsx";

export default async function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const source = j(file.source);

  const hasRefineElement =
    source.find(j.JSXElement, {
      openingElement: {
        name: {
          name: "Refine",
        },
      },
    }).length !== 0;

  if (!hasRefineElement) {
    return;
  }

  const functionDeclaration = source.find(j.FunctionDeclaration, {
    id: {
      name: "App",
    },
  });

  addReactRouterImports(j, source);

  // Find the first jsx element in the function and wrap it with `BrowserRouter` component.

  functionDeclaration.forEach((funcDec) => {
    const openerElements = j(funcDec).find(j.JSXElement).at(0);

    openerElements.forEach((openerElement) => {
      wrapElement(j, source, openerElement, "BrowserRouter");
    });
  });

  const refineElements = source.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Refine",
      },
    },
  });

  refineElements.forEach((refineElement) => {
    addAttributeIfNotExist(
      j,
      source,
      refineElement,
      "routerProvider",
      j.jsxExpressionContainer(j.identifier("routerProvider")),
    );

    wrapChildren(j, source, refineElement, "Routes");
  });

  const routesElements = source.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Routes",
      },
    },
  });

  routesElements.forEach((routesElement) => {
    let elementCount = 0;

    const newRouteElements = [];

    routesElement.node?.children
      ?.filter((value) => {
        return (
          value.type === "JSXElement" &&
          value.openingElement.name.type === "JSXIdentifier" &&
          value.openingElement.name.name !== "Route"
        );
      })
      ?.forEach((child) => {
        if (child.type === "JSXElement") {
          elementCount++;
          const firstAttribute =
            elementCount === 1
              ? j.jsxAttribute(j.jsxIdentifier("index"))
              : j.jsxAttribute(
                  j.jsxIdentifier("path"),
                  j.stringLiteral(
                    `/${decamelize(
                      (child.openingElement.name as JSXIdentifier).name,
                      { separator: "-" },
                    )}`,
                  ),
                );

          const routeElement = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier("Route"),
              [
                firstAttribute,
                j.jsxAttribute(
                  j.jsxIdentifier("element"),
                  j.jsxExpressionContainer(j.jsxElement(child.openingElement)),
                ),
              ],
              true,
            ),
          );

          newRouteElements.push(routeElement);
        }
      });

    if (newRouteElements.length === 0) {
      newRouteElements.push(...(routesElement.node.children ?? []));
    } else {
      addOrUpdateImports(j, source, "@refinedev/core", ["ErrorComponent"]);

      const errorRoute = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxIdentifier("Route"),
          [
            j.jsxAttribute(j.jsxIdentifier("path"), j.literal("*")),
            j.jsxAttribute(
              j.jsxIdentifier("element"),
              j.jsxExpressionContainer(
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxIdentifier("ErrorComponent"),
                    [],
                    true,
                  ),
                ),
              ),
            ),
          ],
          true,
        ),
      );

      newRouteElements.push(errorRoute);
    }

    routesElement.replace(
      j.jsxElement(
        routesElement.node.openingElement,
        routesElement.node.closingElement,
        newRouteElements,
      ),
    );
  });

  return await prettierFormat(source.toSource());
}

export const addReactRouterImports = (j: JSCodeshift, source: Collection) => {
  addOrUpdateImports(
    j,
    source,
    "react-router",
    ["BrowserRouter", "Routes", "Route"],
    (sourceDeclarations, targetDeclaration) => {
      sourceDeclarations.at(0).insertAfter(targetDeclaration);
    },
  );

  addOrUpdateImports(
    j,
    source,
    "@refinedev/react-router",
    ["routerProvider"],
    (sourceDeclarations, targetDeclaration) => {
      sourceDeclarations.at(0).insertAfter(targetDeclaration);
    },
    true,
  );
};
