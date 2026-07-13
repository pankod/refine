import type {
  ASTPath,
  Collection,
  ImportDeclaration,
  JSCodeshift,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
} from "jscodeshift";

export const wrapElement = (
  j: JSCodeshift,
  source: Collection,
  element: ASTPath<JSXElement>,
  wrapper: string,
  wrapperAttributes: JSXAttribute[] = [],
) => {
  const existingWrapperElement = source.find(j.JSXElement, {
    openingElement: { name: { name: wrapper } },
  });

  if (existingWrapperElement.length) {
    return element;
  }

  const wrapperElement = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier(wrapper), wrapperAttributes),
    j.jsxClosingElement(j.jsxIdentifier(wrapper)),
    [
      j.jsxElement(
        element.node.openingElement,
        element.node.closingElement,
        element.node.children,
      ),
    ],
  );

  j(element).replaceWith(wrapperElement);

  return element;
};

export const wrapChildren = (
  j: JSCodeshift,
  source: Collection,
  element: ASTPath<JSXElement>,
  wrapper: string,
  wrapperAttributes: JSXAttribute[] = [],
) => {
  const existingWrapperElement = source.find(j.JSXElement, {
    openingElement: { name: { name: wrapper } },
  });

  if (existingWrapperElement.length) {
    return element;
  }

  const wrapperElement = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier(wrapper), wrapperAttributes),
    j.jsxClosingElement(j.jsxIdentifier(wrapper)),
    element.value.children,
  );

  j(element).replaceWith(
    j.jsxElement(element.node.openingElement, element.node.closingElement, [
      wrapperElement,
    ]),
  );

  return element;
};

export const addAttributeIfNotExist = (
  j: JSCodeshift,
  source: Collection,
  element: ASTPath<JSXElement>,
  attributeIdentifier: string,
  attributeValue?: JSXElement | JSXExpressionContainer,
) => {
  const existingAttribute = source.find(j.JSXAttribute, {
    name: {
      name: attributeIdentifier,
    },
  });

  if (existingAttribute.length) {
    return;
  }

  const attribute = j.jsxAttribute(
    j.jsxIdentifier(attributeIdentifier),
    attributeValue ? attributeValue : undefined,
  );

  element.node.openingElement.attributes?.push(attribute);
};

export const addOrUpdateImports = (
  j: JSCodeshift,
  source: Collection,
  importPath: string,
  importIdentifierNames: string[],
  insertFunc?: (
    sourceDeclaration: Collection<ImportDeclaration>,
    targetDeclaration: ImportDeclaration,
  ) => void,
  isDefault = false,
) => {
  const existingImports = source.find(j.ImportDeclaration, {
    source: {
      value: importPath,
    },
  });

  if (isDefault && existingImports.length > 0) {
    return;
  }

  const specifierFunc = isDefault
    ? j.importDefaultSpecifier
    : j.importSpecifier;

  const importSpecifiers = importIdentifierNames.map((importIdentifierName) =>
    specifierFunc(j.identifier(importIdentifierName)),
  );

  if (existingImports.length) {
    // Check existing imports in the `ImportDeclaration` to avoid duplicate imports
    const nonExistingImportIdentifiers = importIdentifierNames.filter(
      (importIdentifierName) =>
        existingImports.find(j.ImportSpecifier).filter((path) => {
          return path.node.imported.name === importIdentifierName.split(" ")[0];
        }).length === 0,
    );

    if (nonExistingImportIdentifiers.length === 0) {
      return;
    }

    const nonExistingSpecifiers = nonExistingImportIdentifiers.map(
      (importIdentifierName) =>
        specifierFunc(j.identifier(importIdentifierName)),
    );

    existingImports
      .at(0)
      .get("specifiers")
      .value.push(...nonExistingSpecifiers);
  } else {
    const importDeclaration = j.importDeclaration(
      importSpecifiers,
      j.literal(importPath),
    );

    insertFunc?.(source.find(j.ImportDeclaration), importDeclaration);
  }
};

export const addOrUpdateNamelessImport = (
  j: JSCodeshift,
  source: Collection,
  importPath: string,
  insertFunc: (
    sourceDeclaration: Collection<ImportDeclaration>,
    targetDeclaration: ImportDeclaration,
  ) => void,
) => {
  const existingImports = source.find(j.ImportDeclaration, {
    source: {
      value: importPath,
    },
  });

  if (existingImports.length) {
    return;
  }

  const importDeclaration = j.importDeclaration([], j.literal(importPath));

  insertFunc(source.find(j.ImportDeclaration), importDeclaration);
};

export const removeImportIfExists = (
  j: JSCodeshift,
  source: Collection,
  importPath: string,
  importIdentifierName: string,
) => {
  source
    .find(j.ImportDeclaration, { source: { value: importPath } })
    .find(j.ImportSpecifier, { imported: { name: importIdentifierName } })
    .remove();
};
