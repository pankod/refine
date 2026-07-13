const DEFAULT_DEVTOOLS_PORT = 5001;

export const getDevtoolsUrlFromEnv = () => {
  const PORT_FROM_ENV =
    typeof __PROCESS_KEY__ !== "undefined" && "env" in __PROCESS_KEY__
      ? __PROCESS_ENV_REFINE_DEVTOOLS_PORT_KEY__ ||
        __PROCESS_ENV_NEXT_PUBLIC_REFINE_DEVTOOLS_PORT_KEY__ ||
        __PROCESS_ENV_REACT_APP_REFINE_DEVTOOLS_PORT_KEY__
      : typeof __IMPORT_META_KEY__ !== "undefined" && __IMPORT_META_KEY__.env
        ? __IMPORT_META_ENV_REFINE_DEVTOOLS_PORT_KEY__ ||
          __IMPORT_META_ENV_VITE_REFINE_DEVTOOLS_PORT_KEY__
        : null;

  const port = PORT_FROM_ENV || DEFAULT_DEVTOOLS_PORT;

  return [`http://localhost:${port}`, `ws://localhost:${port}`] as [
    httpUrl: string,
    wsUrl: string,
  ];
};
