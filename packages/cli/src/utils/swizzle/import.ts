const packageRegex =
  /import(?:\s+(type))?\s*(?:([^\s\{\},]+)\s*(?:,\s*)?)?(\{[^}]+\})?\s*(?:\*\s*as\s+([^\s\{\}]+)\s*)?from\s*['"]([^'"]+)['"];?/g;

const nameChangeRegex = /((?:\w|\s|_)*)( as )((?:\w|\s|_)*)( |,)?/g;

export type ImportMatch = {
  statement: string;
  importPath: string;
  defaultImport?: string;
  namedImports?: string;
  namespaceImport?: string;
  isType?: boolean;
};

export type NameChangeMatch = {
  statement: string;
  fromName: string;
  toName: string;
  afterCharacter?: string;
};

export const getImports = (content: string): Array<ImportMatch> => {
  const matches = content.matchAll(packageRegex);

  const imports: Array<ImportMatch> = [];

  for (const match of matches) {
    const [
      statement,
      typePrefix,
      defaultImport,
      namedImports,
      namespaceImport,
      importPath,
    ] = match;

    imports.push({
      isType: typePrefix === "type",
      statement,
      importPath,
      ...(defaultImport && { defaultImport }),
      ...(namedImports && { namedImports }),
      ...(namespaceImport && { namespaceImport }),
    });
  }

  return imports?.filter(Boolean);
};

export const getNameChangeInImport = (
  namedImportString: string,
): Array<NameChangeMatch> => {
  const matches = namedImportString.matchAll(nameChangeRegex);

  const nameChanges: Array<NameChangeMatch> = [];

  for (const match of matches) {
    const [statement, fromName, _as, toName, afterCharacter] = match;

    nameChanges.push({
      statement,
      fromName: fromName.trim(),
      toName: toName.trim(),
      afterCharacter,
    });
  }

  return nameChanges;
};

/** @internal */
export const getContentBeforeImport = (
  content: string,
  importMatch: ImportMatch,
): string => {
  // get the content before the import statement and between the last import statement and the current one
  const contentBeforeImport = content.substring(
    0,
    content.indexOf(importMatch.statement),
  );
  // get the last import statement
  const lastImportStatement = getImports(contentBeforeImport).pop();

  // if there is no last import statement, return the content before the current import statement
  if (!lastImportStatement) {
    return contentBeforeImport;
  }

  // get the content between the last import statement and the current one
  const contentBetweenImports = contentBeforeImport.substring(
    contentBeforeImport.indexOf(lastImportStatement?.statement) +
      lastImportStatement?.statement?.length,
  );

  // return the content before the current import statement and between the last import statement and the current one
  return contentBetweenImports;
};

/** @internal */
export const isImportHasBeforeContent = (
  content: string,
  importMatch: ImportMatch,
): boolean => {
  const contentBeforeImport = importMatch
    ? getContentBeforeImport(content, importMatch)
    : "";

  return !!contentBeforeImport.trim();
};

const IMPORT_ORDER = ["react", "@refinedev/core", "@refinedev/"];

export const reorderImports = (content: string): string => {
  let newContent = content;
  // imports can have comments before them, we need to preserve those comments and import statements.
  // so we need to filter out the imports with comments before.
  const allImports = getImports(content);
  // remove `import type` imports
  const allModuleImports = allImports.filter(
    (importMatch) => !importMatch.isType,
  );
  const typeImports = allImports.filter((importMatch) => importMatch.isType);

  const importsWithBeforeContent: ImportMatch[] = [];
  const importsWithoutBeforeContent: ImportMatch[] = [];

  // // remove all type imports
  typeImports.forEach((importMatch) => {
    newContent = newContent.replace(`${importMatch.statement}\n`, "");
  });

  allModuleImports.forEach((importMatch) => {
    if (isImportHasBeforeContent(newContent, importMatch)) {
      importsWithBeforeContent.push(importMatch);
    } else {
      importsWithoutBeforeContent.push(importMatch);
    }
  });

  // insertion point is the first import statement, others will be replaced to empty string and added to the first import line
  const insertionPoint = newContent.indexOf(
    importsWithoutBeforeContent?.[0]?.statement,
  );

  // remove all the imports without comments before
  importsWithoutBeforeContent.forEach((importMatch) => {
    newContent = newContent.replace(importMatch.statement, "");
  });

  // we need to merge the imports from the same package unless one of them is a namespace import]
  const importsByPackage = importsWithoutBeforeContent.reduce(
    (acc, importMatch) => {
      const { importPath } = importMatch;

      if (acc[importPath]) {
        acc[importPath].push(importMatch);
      } else {
        acc[importPath] = [importMatch];
      }

      return acc;
    },
    {} as Record<string, ImportMatch[]>,
  );

  // merge the imports from the same package
  const mergedImports = Object.entries(importsByPackage).map(
    ([importPath, importMatches]) => {
      // example: A
      const defaultImport = importMatches.find(
        (importMatch) => importMatch.defaultImport,
      );

      // example: * as A
      const namespaceImport = importMatches.find(
        (importMatch) => importMatch.namespaceImport,
      );

      // example: { A, B }
      // example: { A as C, B }
      // content inside the curly braces should be merged
      const namedImports = importMatches
        .filter((importMatch) => importMatch.namedImports)
        .map((importMatch) => {
          // remove curly braces and trim then split by comma (can be multiline)
          const namedImports = (importMatch.namedImports ?? "")
            .replace(/{|}/g, "")
            .trim()
            .split(",")
            .map((namedImport) => namedImport.trim());

          return namedImports.filter(Boolean).join(", ");
        })
        .join(", ");

      let importLine = "";

      // default import and namespace import can not be used together
      // but we can use default import and named imports together
      // so we need to merge them
      if (namespaceImport) {
        importLine += `${namespaceImport.statement}\n`;
      }
      if (defaultImport || namedImports) {
        if (defaultImport && namedImports) {
          importLine += `import ${defaultImport.defaultImport}, { ${namedImports} } from "${importMatches[0].importPath}";\n`;
        } else if (defaultImport) {
          importLine += `import ${defaultImport.defaultImport} from "${importMatches[0].importPath}";\n`;
        } else {
          importLine += `import { ${namedImports} } from "${importMatches[0].importPath}";\n`;
        }
      }

      return [importPath, importLine] as [
        importPath: string,
        importLine: string,
      ];
    },
  );

  // sort the imports without comments before
  // sort should be done by IMPORT_ORDER and alphabetically
  // priority is exact match in IMPORT_ORDER, then includes match in IMPORT_ORDER, then alphabetically
  const sortedImports = [...mergedImports].sort(
    ([aImportPath], [bImportPath]) => {
      const aImportOrderIndex = IMPORT_ORDER.findIndex((order) =>
        aImportPath.includes(order),
      );
      const bImportOrderIndex = IMPORT_ORDER.findIndex((order) =>
        bImportPath.includes(order),
      );

      if (aImportOrderIndex === bImportOrderIndex) {
        return aImportPath.localeCompare(bImportPath);
      }

      if (aImportOrderIndex === -1) {
        return 1;
      }

      if (bImportOrderIndex === -1) {
        return -1;
      }

      return aImportOrderIndex - bImportOrderIndex;
    },
  );

  // add the sorted imports to the insertion point keep the before and after content
  // add the type imports after the sorted imports
  const joinedModuleImports = sortedImports
    .map(([, importLine]) => importLine)
    .join("");
  const joinedTypeImports = [
    ...typeImports.map((importMatch) => importMatch.statement),
    "",
  ].join("\n");

  newContent =
    newContent.substring(0, insertionPoint) +
    joinedModuleImports +
    joinedTypeImports +
    newContent.substring(insertionPoint);

  return newContent;
};
