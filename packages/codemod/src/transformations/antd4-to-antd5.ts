import type { API, Collection, FileInfo, JSCodeshift } from "jscodeshift";

export const parser = "tsx";

const updateStyles = (j: JSCodeshift, root: Collection<any>) => {
  const styleMinCssImport = root.find(j.ImportDeclaration, {
    source: {
      value: "@pankod/refine-antd/dist/styles.min.css",
    },
  });

  styleMinCssImport.replaceWith((path) => {
    path.node.source.value = "@pankod/refine-antd/dist/reset.css";

    return path.node;
  });
};

const updateActionButtonsPropstoHeaderButtons = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  const components = ["Show", "Edit", "List", "Create"];
  const changedProps = {
    actionButtons: "headerButtons",
    pageHeaderProps: "headerProps",
  };

  components.forEach((name) => {
    const element = root.find(j.JSXElement, {
      openingElement: {
        name: {
          name,
        },
      },
    });

    Object.keys(changedProps).forEach((prop) => {
      const jsxAttribute = element.find(j.JSXAttribute, {
        name: {
          name: prop,
        },
      });

      if (jsxAttribute.length > 0) {
        jsxAttribute.forEach((path) => {
          path.node.name.name = changedProps[prop];
        });
      }
    });
  });
};

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  updateStyles(j, source);
  updateActionButtonsPropstoHeaderButtons(j, source);

  return source.toSource();
}
