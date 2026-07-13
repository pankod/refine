import path from "path";
import type { API, FileInfo } from "jscodeshift";
import PackageJson from "@npmcli/package-json";

import { addV3LegacyAuthProviderCompatibleTrueToAuthHooks } from "./v4/add-v3LegacyAuthProviderCompatible-true-to-auth-hooks";
import { authProviderToLegacyAuthProvider } from "./v4/authProvider-to-legacyAuthProvider";
import { metaDataToMeta } from "./v4/metadata-to-meta";
import { moveDeprecatedAccessControlProps } from "./v4/move-deprecated-access-control";
import { routerToLegacyRouter } from "./v4/router-to-legacy-router";
import { resourceNameToResourceForButtons } from "./v4/resourceName-to-resource";
import { separateImportsAntD } from "./v4/separate-imports-antd";
import { separateImportsChakra } from "./v4/separate-imports-chakra";
import { separateImportsMantine } from "./v4/separate-imports-mantine";
import { separateImportsMUI } from "./v4/separate-imports-mui";
import { separateImportsReactHookForm } from "./v4/separate-imports-react-hook-form";
import { separateImportsReactQuery } from "./v4/separate-imports-react-query";
import { separateImportsReactTable } from "./v4/separate-imports-react-table";
import { useMenuToCore } from "./v4/use-menu-to-core";
import { separateImportsReactRouterV6 } from "./v4/separate-imports-react-router-v6";
import { fixV4Deprecations } from "./v4/fix-v4-deprecations";
import { replacePankodImportsWithRefineDev } from "./v4/replace-pankod-imports-with-refinedev";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  install,
  checkPackageLock,
} from "../helpers";

export async function postTransform(files: any, flags: any) {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  if (flags.dry) {
    config.destroy();
    return;
  }

  const rootDir = path.join(process.cwd(), files[0]);

  const pkgJson = await PackageJson.load(rootDir);

  const hasPankodCLIInDependencies =
    !!pkgJson.content.dependencies?.["@pankod/refine-cli"];

  const hasPankodCLIInDevDependencies =
    !!pkgJson.content.devDependencies?.["@pankod/refine-cli"];

  const dependencies = {
    ...pkgJson.content.dependencies,
    ...config.getInstalls(),
  };

  const devDependencies = {
    ...pkgJson.content.devDependencies,
  };

  for (const packageName of [...config.getUninstalls(), "@pankod/refine-cli"]) {
    delete dependencies[packageName];
  }

  if (hasPankodCLIInDependencies || hasPankodCLIInDevDependencies) {
    dependencies["@refinedev/cli"] = "latest";
  }

  if (hasPankodCLIInDevDependencies) {
    delete devDependencies["@pankod/refine-cli"];
  }

  Object.keys(dependencies).forEach((dep) => {
    if (
      dep.startsWith("@pankod") &&
      ![
        "@pankod/refine-react-location",
        "@pankod/refine-react-router",
      ].includes(dep)
    ) {
      delete dependencies[dep];

      const isMUI = dep.includes("@pankod/refine-mui");
      const migratableMUIVersion = "^4.18.2";

      dependencies[dep.replace("@pankod/refine-", "@refinedev/")] = isMUI
        ? migratableMUIVersion
        : "latest";
    }
  });

  pkgJson.update({
    dependencies,
    devDependencies,
  });

  await pkgJson.save();

  const useYarn = checkPackageLock(rootDir) === "yarn.lock";

  await install(rootDir, null, { useYarn, isOnline: true });

  config.destroy();
}

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  fixV4Deprecations(j, source);
  separateImportsReactRouterV6(j, source);
  addV3LegacyAuthProviderCompatibleTrueToAuthHooks(j, source);
  authProviderToLegacyAuthProvider(j, source);
  metaDataToMeta(j, source);
  moveDeprecatedAccessControlProps(j, source);
  resourceNameToResourceForButtons(j, source);
  routerToLegacyRouter(j, source);
  separateImportsAntD(j, source);
  separateImportsChakra(j, source);
  separateImportsMantine(j, source);
  separateImportsMUI(j, source);
  separateImportsReactHookForm(j, source);
  separateImportsReactQuery(j, source);
  separateImportsReactTable(j, source);
  useMenuToCore(j, source);
  replacePankodImportsWithRefineDev(j, source);

  return source.toSource();
}
