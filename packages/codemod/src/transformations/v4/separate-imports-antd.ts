import type { Collection, JSCodeshift } from "jscodeshift";
import { CONFIG_FILE_NAME, CodemodConfig } from "../../helpers";
import { separateImports } from "../../helpers";
import {
  exported,
  rename,
  renameToDefault,
  other,
} from "../../definitions/separated-imports/antd";

const REFINE_ANTD_PATH = "@pankod/refine-antd";
const ANTD_PATH = "antd";
const ANTD_VERSION = "^5.0.5";
const ANTD_ICONS_PATH = "@ant-design/icons";
const ANTD_ICONS_VERSION = "^5.0.1";

export const separateImportsAntD = (j: JSCodeshift, source: Collection) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  separateImports({
    j,
    source,
    imports: exported,
    renameImports: rename,
    renameToDefault: renameToDefault,
    otherImports: other,
    currentLibName: REFINE_ANTD_PATH,
    nextLibName: ANTD_PATH,
  });

  let addIcons = false;

  const addAntd =
    source.find(j.ImportDeclaration, {
      source: {
        value: ANTD_PATH,
      },
    }).length > 0;

  // check Icons import
  const refineImport = source.find(j.ImportDeclaration, {
    source: {
      value: REFINE_ANTD_PATH,
    },
  });

  refineImport.replaceWith((p) => {
    for (const item of p.node.specifiers) {
      if (item.local.name === "Icons") {
        // flag for adding `@antd-design/icons` dependency
        addIcons = true;

        // add new icon namespace import
        source
          .find(j.ImportDeclaration, {
            source: {
              value: REFINE_ANTD_PATH,
            },
          })
          .forEach((path, i) => {
            if (i === 0) {
              path.insertAfter(
                j.importDeclaration(
                  [j.importNamespaceSpecifier(j.identifier("Icons"))],
                  j.literal(ANTD_ICONS_PATH),
                ),
              );
            }
          });
      }
    }

    p.node.specifiers = p.node.specifiers.filter(
      (p) => p.local.name !== "Icons",
    );

    return p.node;
  });

  if (addIcons) {
    config.addPackage(ANTD_ICONS_PATH, ANTD_ICONS_VERSION);

    // add comment to antd-icons import
    source

      .find(j.ImportDeclaration, {
        source: {
          value: ANTD_ICONS_PATH,
        },
      })
      .forEach((path) => {
        path.node.comments = [
          {
            type: "CommentLine",
            value:
              " It is recommended to use explicit import as seen below to reduce bundle size.",
          },
          {
            type: "CommentLine",
            value: ` import { IconName } from "@ant-design/icons";`,
          },
        ];
      });
  }
  if (addAntd) {
    config.addPackage(ANTD_PATH, ANTD_VERSION);
  }

  // remove empty imports
  source
    .find(j.ImportDeclaration, {
      source: {
        value: REFINE_ANTD_PATH,
      },
    })
    .filter((path) => path.node.specifiers.length === 0)
    .remove();
};
