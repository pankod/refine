import React, {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";

type MetaContextValue = Record<string, any>;

export const MetaContext = createContext<MetaContextValue>({});

/**
 * Is used to provide meta data to the children components.
 * @internal
 */
export const MetaContextProvider = ({
  children,
  value,
}: { children: ReactNode; value: MetaContextValue }) => {
  const currentValue = useMetaContext();

  const metaContext = useMemo(() => {
    return {
      ...currentValue,
      ...value,
    };
  }, [currentValue, value]);

  return (
    <MetaContext.Provider value={metaContext}>{children}</MetaContext.Provider>
  );
};

/**
 * @internal
 * @returns The MetaContext value.
 */
export const useMetaContext = () => {
  const context = useContext(MetaContext);
  if (!context) {
    throw new Error("useMetaContext must be used within a MetaContextProvider");
  }

  return useContext(MetaContext);
};
