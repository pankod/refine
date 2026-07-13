import type { API } from "jscodeshift";
import type { FileInfo } from "jscodeshift";

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  // Replace "react-router-dom" with "react-router"
  source
    .find(j.ImportDeclaration, {
      source: {
        value: "react-router-dom",
      },
    })
    .forEach((path) => {
      j(path).replaceWith(
        j.importDeclaration(path.node.specifiers, j.literal("react-router")),
      );
    });

  return source.toSource();
}
