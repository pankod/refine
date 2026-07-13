const MockRefineDevtools = {
  DevtoolsProvider: ({ children }: { children: React.ReactNode }) => children,
  DevtoolsPanel: () => null,
};

const DevtoolsScope = {
  RefineDevtools: MockRefineDevtools,
};

export default DevtoolsScope;
