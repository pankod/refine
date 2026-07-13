import React from "react";
// @ts-expect-error no types
import { useDoc } from "@docusaurus/theme-common/internal";
import {
  Antd,
  Chakra,
  Headless,
  Mantine,
  Mui,
} from "@site/src/assets/integration-icons";

export type PreferredUIPackage =
  | "headless"
  | "antd"
  | "chakra-ui"
  | "mantine"
  | "mui";

export const availableUIPackages = [
  "headless",
  "antd",
  "chakra-ui",
  "mantine",
  "mui",
] as const;

export const UIPackageIcons = {
  headless: (props: typeof Chakra) => <Headless {...props} />,
  antd: (props: typeof Antd) => <Antd {...props} />,
  "chakra-ui": (props: typeof Chakra) => <Chakra {...props} />,
  mantine: (props: typeof Mantine) => <Mantine {...props} />,
  mui: (props: typeof Mui) => <Mui {...props} />,
};

const validate = (value?: string | undefined) => {
  if (availableUIPackages.includes(value as any)) {
    return value;
  }
  return undefined;
};

const getDedicatedFromId = (id: string) => {
  // check if id contains `/<availableUIPackage>/`
  const match = id.match(/\/(headless|antd|chakra-ui|mantine|mui)\//);
  if (match && validate(match[1])) {
    return match[1] as PreferredUIPackage;
  }
  return undefined;
};

const LOCALSTORAGE_KEY = "tutorial-preferred-ui-package";

export const TutorialUIPackageContext = React.createContext<{
  preferred: PreferredUIPackage;
  setPreferred: (val: PreferredUIPackage) => void;
  current: PreferredUIPackage | undefined;
}>({
  preferred: "headless",
  current: undefined,
  setPreferred: () => undefined,
});

export const TutorialUIPackageProvider: React.FC<React.PropsWithChildren<{}>> =
  ({ children }) => {
    const { metadata } = useDoc();

    const dedicated = getDedicatedFromId(metadata.id);

    const [preferred, _setPreferred] =
      React.useState<PreferredUIPackage>("headless");

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        const rawValue = localStorage.getItem(LOCALSTORAGE_KEY);
        const validatedValue = validate(rawValue);
        if (validatedValue) {
          _setPreferred(validatedValue as PreferredUIPackage);
        }
      }
    }, []);

    const setPreferred = (val: PreferredUIPackage) => {
      if (!validate(val)) {
        return undefined;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(LOCALSTORAGE_KEY, val);
      }

      _setPreferred(val);
    };

    React.useEffect(() => {
      if (dedicated && dedicated !== preferred) {
        setPreferred(dedicated);
      }
    }, [dedicated, preferred]);

    return (
      <TutorialUIPackageContext.Provider
        value={{
          preferred,
          setPreferred,
          current: dedicated || preferred,
        }}
      >
        {children}
      </TutorialUIPackageContext.Provider>
    );
  };
