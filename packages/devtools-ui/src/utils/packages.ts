import type {
  AvailablePackageType,
  PackageLatestVersionType,
  PackageType,
} from "@refinedev/devtools-shared";

export const getInstalledPackages = async ({
  force,
}: { force?: boolean } = {}) => {
  const response = await fetch(
    `api/installed-packages${force ? "?force=true" : ""}`,
  );

  const data = (await response.json()) as { data: PackageType[] };

  return data?.data ?? [];
};

export const getAvailablePackages = async () => {
  const response = await fetch("api/available-packages");

  const data = (await response.json()) as { data: AvailablePackageType[] };

  return data?.data ?? [];
};

export const getLatestInfo = async (name: string) => {
  const encoded = encodeURIComponent(name);
  const response = await fetch(`api/packages/${encoded}/latest`);
  const data = (await response.json()) as {
    data: { name: string; version?: string };
  };
  if (data?.data?.version) {
    return {
      name: data.data?.name ?? name,
      latestVersion: data?.data?.version,
    } as PackageLatestVersionType;
  }
  return null;
};

export const installPackages = async (packages: string[]) => {
  const response = await fetch("api/packages/install", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ packages }),
  });

  const data = (await response.json()) as { success: boolean };

  return data?.success;
};
