import type { API, JSCodeshift, Collection, FileInfo } from "jscodeshift";
import fs from "fs";
import path from "path";
import { install } from "../helpers";
import { checkPackageLock } from "../helpers";

export const parser = "tsx";

function addRouterProvider(j: JSCodeshift, root: Collection<any>) {
  const routerProviderImports = root.find(j.ImportDeclaration, {
    source: {
      value: "@pankod/refine-react-router",
    },
  });

  if (routerProviderImports.length === 0) {
    // Import route provider
    root
      .find(j.ImportDeclaration, {
        source: {
          value: "@pankod/refine",
        },
      })
      .insertAfter(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier("routerProvider"))],
          j.literal("@pankod/refine-react-router"),
        ),
      );
  } else {
    console.log(
      "WARNING: A router provider from @pankod/refine-react-router is already imported. This tool will not make any migration for router provider.",
    );
    return;
  }

  const refineRoots = root.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Refine",
      },
    },
  });

  refineRoots.replaceWith((path) => {
    const openingElement = path.node.openingElement;

    let routesExpression: any;

    const routesAttributeIndex = openingElement.attributes?.findIndex(
      (attribute) =>
        attribute.type === "JSXAttribute" &&
        attribute.name.type === "JSXIdentifier" &&
        attribute.name.name === "routes",
    );

    const routerProviderAttributeIndex = openingElement.attributes?.findIndex(
      (attribute) =>
        attribute.type === "JSXAttribute" &&
        attribute.name.type === "JSXIdentifier" &&
        attribute.name.name === "routerProvider",
    );

    if (routerProviderAttributeIndex > -1) {
      console.log(
        "WARNING: There is already a `routerProvider` attribute on Refine component. This tool will not make any migration for router provider.",
      );
      return;
    }

    if (routesAttributeIndex > -1) {
      const routesAttribute = openingElement.attributes?.[routesAttributeIndex];

      if (routesAttribute?.type === "JSXAttribute") {
        const attributeValue = routesAttribute.value;

        if (attributeValue?.type === "JSXExpressionContainer") {
          routesExpression = attributeValue.expression;
        }
      }
    }

    if (routesExpression) {
      openingElement.attributes?.push(
        j.jsxAttribute(
          j.jsxIdentifier("routerProvider"),
          j.jsxExpressionContainer(
            j.objectExpression([
              j.spreadElement(j.identifier("routerProvider")),
              j.property("init", j.identifier("routes"), routesExpression),
            ]),
          ),
        ),
      );

      if (routesAttributeIndex > -1) {
        openingElement.attributes?.splice(routesAttributeIndex, 1);
      }
    } else {
      openingElement.attributes?.push(
        j.jsxAttribute(
          j.jsxIdentifier("routerProvider"),
          j.jsxExpressionContainer(j.identifier("routerProvider")),
        ),
      );
    }

    return path.node;
  });
}

const moveResources = (j: JSCodeshift, root: Collection<any>) => {
  const newResources: { [key: string]: any }[] = [];

  const resourceElements = root.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Resource",
      },
    },
  });

  const rootElements = root.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Refine",
      },
    },
  });

  const resourceImportSpecifiers = root.find(j.ImportSpecifier, {
    imported: {
      name: "Resource",
    },
  });

  if (resourceElements.length === 0) {
    return;
  }

  // Get resources data
  resourceElements.forEach((resources) => {
    const newResource: { [key: string]: any } = {};

    resources.node.openingElement.attributes?.forEach((resource) => {
      if (
        resource.type === "JSXAttribute" &&
        resource.name.type === "JSXIdentifier" &&
        resource.value
      ) {
        newResource[resource.name.name] = resource.value;
      }
    });

    newResources.push(newResource);
  });

  // Construct a resources attribute with the resources data
  const newAttributes = j.jsxAttribute(
    j.jsxIdentifier("resources"),
    j.jsxExpressionContainer(
      j.arrayExpression(
        newResources.map((resource) => {
          const newValue = j.objectExpression(
            Object.entries(resource).map(([key, value]) => {
              const valueToPut = value.expression ? value.expression : value;
              return j.property("init", j.identifier(key), valueToPut as any);
            }),
          );

          return newValue;
        }),
      ),
    ),
  );

  // Add resources attribute
  rootElements.replaceWith((path) => {
    const attributes = path.node.openingElement.attributes;

    const resourcesAttributeIndex = attributes.findIndex(
      (attribute) =>
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "resources",
    );

    if (resourcesAttributeIndex !== -1) {
      console.log(
        "WARNING: There is already a 'resources' attribute on Refine component. This tool will not touch it.",
      );

      return path.node;
    }

    attributes?.push(newAttributes);

    return path.node;
  });

  resourceElements.remove();
  resourceImportSpecifiers.remove();

  // Clear the body of Refine component
  rootElements.replaceWith((path) => {
    const openingElement = path.node.openingElement;

    path.node.closingElement = null;
    openingElement.selfClosing = true;

    return path.node;
  });
};

const packagesToUpdate = [
  "@pankod/refine-airtable",
  "@pankod/refine-graphql",
  "@pankod/refine-hasura",
  "@pankod/refine-nestjsx-crud",
  "@pankod/refine-nextjs-router",
  "@pankod/refine-react-router",
  "@pankod/refine-simple-rest",
  "@pankod/refine-strapi",
  "@pankod/refine-strapi-graphql",
  "@pankod/refine-supabase",
];

export async function postTransform(files: any, flags: any) {
  const rootDir = path.join(process.cwd(), files[0]);
  const packageJsonPath = path.join(rootDir, "package.json");
  const useYarn = checkPackageLock(rootDir) === "yarn.lock";
  let packageJsonData;

  try {
    packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch (err) {
    console.error(
      `Error: failed to load package.json from ${packageJsonPath}, ensure provided directory is root.`,
    );
  }

  const dependenciesToInstall: Array<{
    name: string;
    version: string;
  }> = [
    {
      name: "@pankod/refine",
      version: "2.x.x",
    },
    {
      name: "@pankod/refine-react-router",
      version: "2.x.x",
    },
  ];

  for (const key of Object.keys(packageJsonData.dependencies)) {
    if (packagesToUpdate.includes(key)) {
      dependenciesToInstall.push({
        name: key,
        version: "2.x.x",
      });
    }
  }

  if (!flags.dry) {
    await install(
      rootDir,
      dependenciesToInstall.map((dep) => `${dep.name}@${dep.version}`),
      {
        useYarn,
        isOnline: true,
      },
    );
  }
}

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  const rootElement = source.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Refine",
      },
    },
  });

  if (rootElement.length === 0) {
    return;
  }

  addRouterProvider(j, source);
  moveResources(j, source);

  return source.toSource();
}
