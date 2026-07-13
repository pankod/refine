import envinfo from "envinfo";
import os from "os";

export const getOSType = () => {
  const osPlatform = os.type();

  const types: Record<string, "macOS" | "Linux" | "Windows"> = {
    Darwin: "macOS",
    Linux: "Linux",
    Windows_NT: "Windows",
  };

  return types[osPlatform];
};

export const getOS = async () => {
  // returns as a ['OS', 'macOS Mojave 10.14.5']
  const [_, OSInfo] =
    (await envinfo.helpers.getOSInfo()) as unknown as string[];

  return {
    name: getOSType(),
    version: OSInfo,
  };
};
