import type {
  API,
  FileInfo,
  JSCodeshift,
  JSXElement,
  ASTPath,
  Collection,
} from "jscodeshift";
import execa from "execa";
import { prettierFormat } from "../utils/swizzle/prettierFormat";

export const parser = "tsx";

// runs .bin/jscodeshift with the default export transformer on the current directory
export const addDevtoolsComponent = async () => {
  const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
  const { stderr } = execa.sync(jscodeshiftExecutable, [
    "./",
    "--extensions=ts,tsx,js,jsx",
    "--parser=tsx",
    `--transform=${__dirname}/../src/transformers/add-devtools-component.ts`,
    "--ignore-pattern=.cache",
    "--ignore-pattern=node_modules",
    "--ignore-pattern=build",
    "--ignore-pattern=.next",
    "--ignore-pattern=dist",
  ]);

  if (stderr) {
    console.log(stderr);
  }
};

export default async function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const source = j(file.source);

  const refineElement = source.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Refine",
      },
    },
  });

  const hasRefineElement = refineElement.length !== 0;

  if (!hasRefineElement) {
    return;
  }

  if (hasDevtoolsImport(j, source) && hasDevtoolsProvider(j, source)) {
    return;
  }

  addDevtoolsImport(j, source);
  refineElement.forEach((path) => {
    wrapWithDevtoolsProvider(j, path);
  });

  return await prettierFormat(source.toSource());
}

export const hasDevtoolsImport = (j: JSCodeshift, source: Collection) => {
  return source.find(j.ImportDeclaration, {
    source: {
      value: "@refinedev/devtools",
    },
  }).length;
};

export const hasDevtoolsProvider = (j: JSCodeshift, source: Collection) => {
  return source.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "DevtoolsProvider",
      },
    },
  }).length;
};

export const addDevtoolsImport = (j: JSCodeshift, source: Collection) => {
  const devtoolsImport = j.importDeclaration(
    [
      j.importSpecifier(j.identifier("DevtoolsProvider")),
      j.importSpecifier(j.identifier("DevtoolsPanel")),
    ],
    j.literal("@refinedev/devtools"),
  );

  source.get().node.program.body.unshift(devtoolsImport);
};

const wrapWithDevtoolsProvider = (
  j: JSCodeshift,
  refineEelement: ASTPath<JSXElement>,
) => {
  const panel = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier("DevtoolsPanel")),
  );
  panel.openingElement.selfClosing = true;

  const provider = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier("DevtoolsProvider")),
    j.jsxClosingElement(j.jsxIdentifier("DevtoolsProvider")),
    // Pass in the refineEelement component as children
    [refineEelement.value, panel],
  );

  j(refineEelement).replaceWith(provider);
  return { panel, provider };
};
