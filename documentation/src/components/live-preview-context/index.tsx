import React, { type PropsWithChildren } from "react";

export type LivePreviewContextType = {
  shared: string | undefined;
  sharedCss: string | undefined;
  setShared: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSharedCss: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const LivePreviewContext = React.createContext<LivePreviewContextType>({
  shared: undefined,
  sharedCss: undefined,
  setShared: () => undefined,
  setSharedCss: () => undefined,
});

export const LivePreviewProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [shared, setShared] = React.useState<string | undefined>(undefined);
  const [sharedCss, setSharedCss] = React.useState<string | undefined>(
    undefined,
  );
  return (
    <LivePreviewContext.Provider
      value={{ shared, setShared, sharedCss, setSharedCss }}
    >
      {children}
    </LivePreviewContext.Provider>
  );
};

export const useLivePreviewContext = (): LivePreviewContextType => {
  const context = React.useContext(LivePreviewContext);

  if (!context) {
    throw new Error(
      "useLivePreviewContext must be used within a LivePreviewProvider",
    );
  }

  return context;
};
