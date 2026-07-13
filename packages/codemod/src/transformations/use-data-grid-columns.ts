import type {
  API,
  JSCodeshift,
  Collection,
  FileInfo,
  ObjectExpression,
  Identifier,
  Property,
  JSXAttribute,
} from "jscodeshift";

export const parser = "tsx";

const removeColumnsOnUseDataGrid = (j: JSCodeshift, root: Collection<any>) => {
  const useDataGridHook = root.find(j.CallExpression, {
    callee: {
      name: "useDataGrid",
    },
  });

  useDataGridHook.replaceWith((p) => {
    if (p.node.arguments.length === 0) {
      return p.node;
    }

    const propertiesWithoutColumns = (
      p.node.arguments[0] as unknown as ObjectExpression
    ).properties.filter(
      (p: Property) => (p.key as Identifier).name !== "columns",
    );

    if (propertiesWithoutColumns.length === 0) {
      p.node.arguments = [];

      return p.node;
    }

    (p.node.arguments[0] as unknown as ObjectExpression).properties =
      propertiesWithoutColumns;

    return p.node;
  });
};

const addColumnsToUseDataGrid = (j: JSCodeshift, root: Collection<any>) => {
  const dataGridElement = root.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "DataGrid",
      },
    },
  });

  if (dataGridElement.length === 0) {
    console.warn(
      "If you use `useDataGrid` hook, you need to use `DataGrid` element.",
    );
    return;
  }

  dataGridElement.forEach((path) => {
    const hasColumnsAttribute = path.node.openingElement.attributes.find(
      (attribute) => (attribute as JSXAttribute).name?.name === "columns",
    );

    if (hasColumnsAttribute) {
      return;
    }

    path.node.openingElement.attributes.push(
      j.jsxAttribute(
        j.jsxIdentifier("columns"),
        j.jsxExpressionContainer(j.identifier("columns")),
      ),
    );
  });
};

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  const refineMuiUseDataGridImports = source.find(j.ImportDeclaration, {
    source: {
      value: "@pankod/refine-mui",
    },
    specifiers: [
      {
        imported: {
          name: "useDataGrid",
        },
      },
    ],
  });

  if (refineMuiUseDataGridImports.length === 0) {
    return;
  }

  removeColumnsOnUseDataGrid(j, source);
  addColumnsToUseDataGrid(j, source);

  return source.toSource();
}
