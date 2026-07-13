import path from "path";
import globby from "globby";

export const getInstalledPackageJSONPath = async (packageName: string) => {
  try {
    const filesFromGlobbySearch = await globby(
      `node_modules/${packageName}/package.json`,
      {
        onlyFiles: true,
      },
    );

    let fileFromModule: string | null = null;

    try {
      const pkgJsonPath = require.resolve(
        path.join(packageName, "package.json"),
      );
      if (pkgJsonPath) {
        fileFromModule = pkgJsonPath;
      }
    } catch (err) {
      //
    }

    return (
      [
        ...filesFromGlobbySearch,
        ...(fileFromModule ? [fileFromModule] : []),
      ][0] ?? null
    );
  } catch (err) {
    return null;
  }
};
