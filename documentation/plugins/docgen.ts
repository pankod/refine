import { Plugin } from "@docusaurus/types";
//
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import {
  ComponentDoc,
  PropItem,
  withCustomConfig,
} from "react-docgen-typescript";
import { ParentType, Props } from "react-docgen-typescript/lib/parser";
import ts from "typescript";

/** TYPES */
type DeclarationType = Omit<ComponentDoc, "methods"> &
  Partial<Pick<ComponentDoc, "methods">> & {
    generatedAt?: number;
  };

type DocgenContent = Record<string, Record<string, DeclarationType>>;

/** CONSTANTS */
const packagesDir = path.join(__dirname, "./../..", "./packages");

const sourceDir = "./src";

const excludedFilePatterns = [
  "node_modules",
  "tsup.config.ts",
  ".test.",
  ".spec.",
];

const excludedValueDeclarationPatterns = ["node_modules/antd/lib/list/"];

const excludePropPatterns = [/^__.*/];

const excludedProps = [
  "className",
  "classNames",
  "styles",
  "unstyled",
  "component",
  "key",
  "ref",
  "style",
  "sx",
  "m",
  "mx",
  "my",
  "mt",
  "ml",
  "mr",
  "mb",
  "p",
  "px",
  "py",
  "pt",
  "pl",
  "pr",
  "pb",
];

const replacementProps: Record<string, string> = {
  // "null | string | number | false | true | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal": "ReactNode",
  ReactElement:
    "ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)>",
  "ReactNode | (value: number) => ReactNode":
    "string | number | boolean | {} | ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> | ReactNodeArray | ReactPortal | ((value: number) => ReactNode)",
  ActionButtonRenderer:
    "ReactNode | ({ defaultButtons: ReactNode }) => ReactNode",
  "DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>":
    "DetailedHTMLProps<HTMLDivElement>",
  "false | OpenNotificationParams | ((data?: unknown, values?: unknown, resource?: string) => OpenNotificationParams)":
    "false | OpenNotificationParams | (data, values, resource) => OpenNotificationParams",
  "false | OpenNotificationParams | ((error?: unknown, values?: unknown, resource?: string) => OpenNotificationParams)":
    "false | OpenNotificationParams | (error, values, resource) => OpenNotificationParams",
  'SvgIconProps<"svg", {}>': "SvgIconProps",
  SpaceProps: "[`SpaceProps`](https://styled-system.com/api#space)",
  "((value: DeleteOneResponse<BaseRecord>) => void)":
    "(value: DeleteOneResponse) => void",
  "{ [key: string]: any; ids?: BaseKey[]; }":
    "{ [key]: any; ids?: BaseKey[]; }",
  "BaseKey | BaseKey[]":
    "[BaseKey](/core/docs/core/interface-references/#basekey) | [BaseKey[]](/core/docs/core/interface-references/#basekey)",
  BaseKey: "[BaseKey](/core/docs/core/interface-references/#basekey)",
  MetaDataQuery:
    "[MetaDataQuery](/core/docs/core/interface-references/#metadataquery)",
  CrudFilters:
    "[CrudFilters](/core/docs/core/interface-references/#crudfilters)",
  CrudSorting:
    "[CrudSorting](/core/docs/core/interface-references/#crudsorting)",
};

const spinner = ora("Generating Refine declarations...");

/** HELPERS */
const getPackageNamePathMap = async (directory: string) => {
  const packages = await fs.readdir(directory);
  const packageNamePathMap: Record<string, string> = {};

  const includedPackages = process.env.INCLUDED_PACKAGES?.split(",") || [];

  await Promise.all(
    packages.map(async (packageName) => {
      const packagePath = path.join(directory, packageName, "package.json");

      if (fs.existsSync(packagePath)) {
        const packageJson = await fs.readJSON(packagePath);

        if (
          (includedPackages.length == 0 ||
            includedPackages.some((p) => packageName.includes(p))) &&
          packageJson.name !== "@refinedev/refine-ui"
        ) {
          packageNamePathMap[packageJson.name] = path.join(packagePath, "..");
        }
      }

      return packageName;
    }),
  );

  return packageNamePathMap;
};

const getPaths = async (packageDir: string, excludedPatterns: string[]) => {
  const dir = await fs.readdir(packageDir);
  const filtered: string[] = [];
  await Promise.all(
    dir.map(async (file) => {
      const result = await fs.pathExists(path.join(packageDir, file));
      if (result) {
        filtered.push(file);
      }
    }),
  );

  return filtered
    .map((p) => path.join(packageDir, p))
    .filter((p) => !excludedPatterns.some((pattern) => p.includes(pattern)));
};

const _getPrefixFromDeclarationPath = async (path: string) => {
  const map = await getPackageNamePathMap(packagesDir);
  const packageName = Object.keys(map).find((key) => path.includes(map[key]));
  return packageName;
};

const getComponentName = (name: string, _fileName: string) => {
  return name;
  // return `${getPrefixFromDeclarationPath(fileName)}#${name}`;
};

const getOutputName = (packageName: string) => {
  return packageName;
};

const declarationFilter = (declaration: ParentType) => {
  return (
    !declaration.fileName.includes("node_modules") ||
    declaration.fileName.includes("@refinedev")
  );
};

const valueDeclarationFilter = (tsDeclaration?: ts.Declaration) => {
  // excludedValueDeclarationPatterns includes fileNames of source files to be ignored (partially)
  const sourceFileName = tsDeclaration?.getSourceFile().fileName;
  // if sourceFileName includes any of the excludedValueDeclarationPatterns then ignore it
  const isIgnored = excludedValueDeclarationPatterns.some((pattern) =>
    sourceFileName?.includes(pattern),
  );

  return !isIgnored;
};

const createParser = (configPath: string) => {
  const docgenParser = withCustomConfig(path.join(configPath), {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    shouldIncludePropTagMap: true,
    componentNameResolver: (exp, source) => {
      const name = getComponentName(exp.getName(), source.fileName);
      if (valueDeclarationFilter(exp.valueDeclaration)) {
        return name;
      }
      return `IGNORED_${name}`;
    },
    propFilter: (prop: PropItem) => {
      const isExcluded =
        excludedProps.includes(prop.name) ||
        excludePropPatterns.some((pattern) => pattern.test(prop.name));

      const isExternal =
        prop.declarations &&
        prop.declarations.length > 0 &&
        !Boolean(prop.declarations.find(declarationFilter));

      const isUnknown = typeof prop.declarations === "undefined";

      if (isExcluded || isExternal || isUnknown) {
        return false;
      }
      return true;
    },
  });

  return docgenParser;
};

const normalizeMarkdownLinks = (value: string) => {
  return value.replace(/\[(.*?)\]\s{1}\((.*?)\)/g, (_, p1, p2) => {
    return `[${p1}](${p2})`;
  });
};

const prepareDeclaration = (declaration: ComponentDoc) => {
  const data: DeclarationType = { ...declaration };
  delete data.methods;
  delete data.tags;

  data.generatedAt = Date.now();

  Object.keys(data.props).forEach((prop) => {
    data.props[prop].type.name = normalizeMarkdownLinks(
      data.props[prop].type.name,
    );

    delete data.props[prop].parent;
    delete data.props[prop].declarations;

    if (data.props[prop].type.raw === "ReactNode") {
      data.props[prop].type.name = "ReactNode";
    }

    if (data.props[prop].type.name in replacementProps) {
      data.props[prop].type.name = replacementProps[data.props[prop].type.name];
    }

    if (data.props[prop].type.name === "enum") {
      data.props[prop].type.name = data.props[prop].type.value
        .map((val: { value: string }) => val.value)
        .join(" | ");
    }
  });

  const ordered = Object.keys(data.props)
    // .sort()
    .reduce((obj, key) => {
      obj[key] = data.props[key];
      return obj;
    }, {} as Props);

  data.props = ordered;

  return data;
};

const transposeDeclarations = (declarations: DeclarationType[]) => {
  const transposed: Record<string, DeclarationType> = {};

  declarations.forEach((declaration) => {
    transposed[declaration.displayName] = declaration;
  });

  return transposed;
};

const generateDeclarations = async (packagePaths: [string, string][]) => {
  const generated: Record<string, Record<string, DeclarationType>> = {};

  await Promise.all(
    packagePaths.map(async ([packageName, packagePath]) => {
      const parser = createParser(path.join(packagePath, "./tsconfig.json"));

      const sourcePath = path.join(packagePath, sourceDir);

      if (!(await fs.pathExists(sourcePath))) {
        spinner.fail(
          `Component path does not exist for package ${packageName}: ${sourcePath}`,
        );
        process.exit(1);
      }

      const declarationPaths = await getPaths(sourcePath, excludedFilePatterns);

      const parsed = parser.parse(declarationPaths).map(prepareDeclaration);

      const transposed = transposeDeclarations(parsed);

      const outputName = getOutputName(packageName);

      generated[outputName] = transposed;

      spinner.stop();
      spinner.start(`- Generated declarations - ${packageName}`);

      return [packageName, packagePath];
    }),
  );

  return generated;
};

/** DOCGEN */
const handleDocgen = async () => {
  const packagePathMap = await getPackageNamePathMap(packagesDir);
  const packagePathMapArray = Object.entries(packagePathMap);

  spinner.stop();
  spinner.start(`- Found ${packagePathMapArray.length} packages`);

  const res = await generateDeclarations(packagePathMapArray);

  spinner.succeed("Generated declarations");

  return res;
};

export default function plugin(): Plugin<DocgenContent> {
  return {
    name: "docusaurus-plugin-refine-docgen",
    getPathsToWatch: function () {
      return [packagesDir];
    },
    async loadContent() {
      if (!process.env.DISABLE_DOCGEN) {
        spinner.start();
        return await handleDocgen();
      }

      return {};
    },
    configureWebpack(config: any) {
      return {
        resolve: {
          alias: {
            "@docgen": path.join(
              config.resolve?.alias?.["@generated"],
              "docusaurus-plugin-refine-docgen",
              "default",
            ),
          },
        },
      };
    },
    async contentLoaded({ content, actions }: any): Promise<void> {
      if (!process.env.DISABLE_DOCGEN) {
        ora("Creating Refine declaration files...").succeed();

        const { createData } = actions;

        const data: Promise<string>[] = [];

        Object.entries(content).forEach(
          ([packageName, packageDeclarations]: any) => {
            Object.entries(packageDeclarations).forEach(
              ([componentName, declaration]) => {
                data.push(
                  createData(
                    `${packageName}/${componentName}.json`,
                    JSON.stringify(declaration),
                  ),
                );
              },
            );
          },
        );

        await Promise.all(data);
      }
    },
  };
}
