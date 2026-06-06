import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";
import type { BaseKey, DataProvider, GetOneParams } from "@refinedev/core";

import { useDataProvider } from ".";

type CustomDataProvider = Omit<DataProvider, "getOne"> & {
  getOne: (params: {
    resource: string;
    id: BaseKey;
    meta?: { test?: string } & GetOneParams["meta"];
  }) => ReturnType<DataProvider["getOne"]>;
};

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

  it("preserves custom provider types when generic is provided", async () => {
    const dataProvider = result.current<CustomDataProvider>();

    await dataProvider.getOne({
      resource: "posts",
      id: 1,
      meta: { test: "typed" },
    });
  });

  it("get list with from second data provider", async () => {
    try {
      result.current("not-exist");
    } catch (error) {
      expect(error).toEqual(new Error(`"not-exist" Data provider not found`));
    }
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
