import { getImports } from "./import";

export const appendAfterImports = (content: string, append: string): string => {
  const imports = getImports(content);
  const lastImport = imports[imports.length - 1];

  const lastImportIndex = lastImport
    ? content.indexOf(lastImport.statement)
    : content.length - 1;

  return `${content.slice(
    0,
    lastImportIndex + lastImport?.statement.length,
  )}\n${append}\n${content.slice(
    lastImportIndex + lastImport?.statement.length,
  )}`;
};
