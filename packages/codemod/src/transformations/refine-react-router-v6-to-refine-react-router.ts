import type { API } from "jscodeshift";
import type { FileInfo } from "jscodeshift";

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  // Replace "@refinedev/react-router-v6" with "@refinedev/react-router"
  source
    .find(j.ImportDeclaration, {
      source: {
        value: "@refinedev/react-router-v6",
      },
    })
    .forEach((path) => {
      j(path).replaceWith(
        j.importDeclaration(
          path.node.specifiers,
          j.literal("@refinedev/react-router"),
        ),
      );
    });

  return source.toSource();
}
