import type { ImportElement } from "../../types";

export const printImports = (imports: Array<ImportElement>) => {
  const byModule = imports.reduce(
    (acc, [element, module, isDefault]) => {
      if (!acc[module]) {
        acc[module] = [] as Array<
          string | [variable: string, isDefault?: boolean]
        >;
      }

      if (!acc[module].includes(element)) {
        if (isDefault) {
          acc[module].push([element, true]);
        } else {
          acc[module].push(element);
        }
      }

      return acc;
    },
    {} as Record<
      string,
      Array<string | [variable: string, isDefault?: boolean]>
    >,
  );

  const lines = Object.entries(byModule).map(([module, elements]) => {
    const defaultImport = elements.find((e) => Array.isArray(e) && e[1]);
    const named = elements.filter((e) => typeof e === "string");
    const defaultStr = defaultImport ? `${defaultImport[0]}` : "";
    const namedStr = named.length ? `{ ${named.join(", ")} }` : "";
    return `import ${defaultStr}${
      defaultStr && namedStr ? ", " : ""
    }${namedStr} from "${module}";`;
  });

  return lines;
};
