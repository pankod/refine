/**
 * This is done to mock `react-dom` as a no-op.
 */

const createRoot = () => {
  return {
    render: () => undefined,
  };
};

const ReactDomClient = {
  ReactDomClient: {
    createRoot,
  },
};

export default ReactDomClient;
