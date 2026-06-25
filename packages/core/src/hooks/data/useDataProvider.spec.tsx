import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useDataProvider } from ".";

describe("useDataProvider Hook", () => {
  const { result } = renderHook(() => useDataProvider(), {
    wrapper: TestWrapper({
      dataProvider: {
        default: MockJSONServer.default,
        second: MockJSONServer.default,
      },
    }),
  });

  it("get list with default data provider", async () => {
    const dataProvider = result.current();
    expect(dataProvider.getList).toBeDefined();
  });

  it("get list with from second data provider", async () => {
    const dataProvider = result.current("second");

    expect(dataProvider.getList).toBeDefined();
  });

  it("get list with from second data provider", async () => {
    try {
      result.current("not-exist");
    } catch (error) {
      expect(error).toEqual(new Error(`"not-exist" Data provider not found`));
    }
  });

  it("should return custom typed data provider when generic is provided", async () => {
    interface CustomDataProvider extends DataProvider {
      customMethod: () => void;
    }

    const { result: customResult } = renderHook(
      () => useDataProvider<CustomDataProvider>(),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              customMethod: () => {},
            } as CustomDataProvider,
          },
        }),
      },
    );

    const dataProvider = customResult.current();
    expect(dataProvider.customMethod).toBeDefined();
  });
});
describe("useDataProvider Hook without default data provider property", () => {
  const { result } = renderHook(() => useDataProvider(), {
    wrapper: TestWrapper({
      dataProvider: {
        someDataProvider: MockJSONServer.default,
      } as any,
    }),
  });

  it("should get the correct data provider methods", async () => {
    expect(() => result.current("someDataProvider")).toThrow(
      "If you have multiple data providers, you must provide default data provider property",
    );
  });

  it("should throw error if don't pass dataProviderName if there is no default data provider", async () => {
    expect(() => result.current()).toThrow(
      `There is no "default" data provider. Please pass dataProviderName.`,
    );
  });
});
