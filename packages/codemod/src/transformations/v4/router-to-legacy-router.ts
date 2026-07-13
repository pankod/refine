import type { JSCodeshift, Collection, JSXAttribute } from "jscodeshift";

const legacyMap = {
  "@pankod/refine-react-router-v6": "@pankod/refine-react-router-v6/legacy",
  "@pankod/refine-nextjs-router": "@pankod/refine-nextjs-router/legacy",
  "@pankod/refine-nextjs-router/app": "@pankod/refine-nextjs-router/legacy-app",
  "@pankod/refine-nextjs-router/pages":
    "@pankod/refine-nextjs-router/legacy-pages",
  "@pankod/refine-remix-router": "@pankod/refine-remix-router/legacy",
};

const oldRouterProp = "routerProvider";
const newRouterProp = "legacyRouterProvider";

const renameImport = (
  j: JSCodeshift,
  source: Collection,
  from: string,
  to: string,
) => {
  source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === from)
    .forEach((path) => {
      j(path).replaceWith(
        j.importDeclaration(path.node.specifiers, j.literal(to)),
      );
    });
};

const renameExport = (
  j: JSCodeshift,
  source: Collection,
  from: string,
  to: string,
) => {
  source
    .find(j.ExportNamedDeclaration)
    .filter((path) => path.node.source && path.node.source.value === from)
    .forEach((path) => {
      j(path).replaceWith(
        j.exportNamedDeclaration(
          path.node.declaration,
          path.node.specifiers,
          j.literal(to),
        ),
      );
    });
};

const renameProp = (
  j: JSCodeshift,
  source: Collection,
  from: string,
  to: string,
) => {
  source
    .find(j.JSXOpeningElement, { name: { name: "Refine" } })
    .forEach((path) => {
      const props = path.node.attributes;

      const propIndex = props.findIndex(
        (prop) => (prop as JSXAttribute)?.name?.name === from,
      );

      if (propIndex !== -1) {
        const prop = props[propIndex];

        if ((prop as JSXAttribute)?.name) {
          if ("name" in prop) {
            prop.name.name = to;
          }
        }
      }
    });
};

export const routerToLegacyRouter = (j: JSCodeshift, source: Collection) => {
  Object.entries(legacyMap).forEach(([from, to]) => {
    renameImport(j, source, from, to);
    renameExport(j, source, from, to);
  });

  renameProp(j, source, oldRouterProp, newRouterProp);
};
