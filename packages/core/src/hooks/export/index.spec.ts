import { vi } from "vitest";
import { renderHook } from "@testing-library/react";
import papaparse from "papaparse";

import { MockJSONServer, TestWrapper, act } from "@test";
import { mockRouterProvider, posts } from "@test/dataMocks";

import { downloadInBrowser } from "../../definitions/helpers/downloadInBrowser";
import * as pickDataProvider from "../../definitions/helpers/pickDataProvider";
import { useExport } from "./";

const testCsv = "col1,col2\r\ncell1,cell2";
vi.mock("papaparse", () => ({
  default: {
    unparse: vi.fn(() => testCsv),
  },
  unparse: vi.fn(() => testCsv),
}));

vi.mock("../../definitions/helpers/downloadInBrowser", () => ({
  downloadInBrowser: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useExport Hook", () => {
  it("should render", () => {
    renderHook(() => useExport(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });
  });

  it("should trigger export correctly", async () => {
    const { result } = renderHook(() => useExport(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });
    let resultingCSV = null;
    await act(async () => {
      resultingCSV = await result.current.triggerExport();
    });

    expect(papaparse.unparse).toHaveBeenCalledWith(posts, expect.anything());
    expect(resultingCSV).toEqual(testCsv);
  });

  it.each(["categories", "posts"])(
    "should call getList with '%s' resource",
    async (testCase) => {
      const getListMock = vi.fn();

      const { result } = renderHook(
        () =>
          useExport({
            resource: testCase,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer.default,
              getList: (props) => getListMock(props.resource),
            },
            resources: [{ name: "posts" }, { name: "categories" }],
          }),
        },
      );

      await act(async () => {
        await result.current.triggerExport();
      });

      expect(getListMock).toHaveBeenCalledWith(testCase);
    },
  );

  it("should call getList with resource from router provider", async () => {
    const getListMock = vi.fn();

    const { result } = renderHook(() => useExport(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          resource: {
            name: "posts",
            list: "/posts",
          },
        }),
        dataProvider: {
          ...MockJSONServer.default,
          getList: (props) => getListMock(props.resource),
        },
        resources: [{ name: "posts" }, { name: "categories" }],
      }),
    });

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(getListMock).toHaveBeenCalledWith("posts");
  });

  it("should cut the amount of data to be exported when given maxItemCount", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          maxItemCount: 1,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(papaparse.unparse).toHaveBeenCalledWith(
      [posts[0]],
      expect.anything(),
    );
  });

  it("should work with custom pageSize", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          pageSize: 1,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(papaparse.unparse).toHaveBeenCalledWith(posts, expect.anything());
  });

  it("should work with custom mapData", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          mapData: (item) => ({
            id: item.id,
            title: item.title,
          }),
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(papaparse.unparse).toHaveBeenCalledWith(
      posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      expect.anything(),
    );
  });

  it("should handle getList throwing error", async () => {
    const onError = vi.fn();
    const { result } = renderHook(
      () =>
        useExport({
          onError,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () => {
                throw new Error("Error");
              },
            } as any,
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(result.current.isLoading).toEqual(false);
    expect(onError).toHaveBeenCalledWith(Error("Error"));

    expect(papaparse.unparse).not.toHaveBeenCalled();
  });

  it.each(["identifier", "name"])(
    "should use identifier, before resource.name when selecting dataProvider. test case: %s",
    async (testCase) => {
      const isIdentifier = testCase === "identifier";

      const pickDataProviderSpy = vi.spyOn(
        pickDataProvider,
        "pickDataProvider",
      );

      const { result } = renderHook(() => useExport(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          routerProvider: mockRouterProvider({
            resource: {
              name: "postsName",
              identifier: isIdentifier ? "postsIdentifier" : undefined,
            },
          }),
        }),
      });

      await act(async () => {
        await result.current.triggerExport();
      });

      expect(papaparse.unparse).toHaveBeenCalledWith(posts, expect.anything());

      if (isIdentifier) {
        expect(pickDataProviderSpy).toHaveBeenCalledWith(
          "postsIdentifier",
          undefined,
          [],
        );
      } else {
        expect(pickDataProviderSpy).toHaveBeenCalledWith(
          "postsName",
          undefined,
          [],
        );
      }

      vi.clearAllMocks();
    },
  );
  describe("should work with new export configuration", () => {
    type TestCase = {
      exportConfig?: {
        filename?: string;
        useTextFile?: boolean;
        useBom?: boolean;
        title?: string;
        showTitle?: boolean;
        unparseConfig?: papaparse.UnparseConfig;
      };
      expectations?: {
        unparseConfig: papaparse.UnparseConfig;
        filename: string | RegExp;
        useBom: boolean;
        csvToSave: string;
      };
    };
    const defaultUnparseConfig: papaparse.UnparseConfig = {
      quotes: true,
      header: true,
    };

    const defaultExpect: TestCase["expectations"] = {
      unparseConfig: defaultUnparseConfig,
      filename: /\.csv$/,
      csvToSave: testCsv,
      useBom: true,
    };

    const createExpectations = (
      expects?: Partial<TestCase["expectations"]>,
    ) => {
      const { unparseConfig, ...rest } = expects ?? {};
      return {
        ...defaultExpect,
        unparseConfig: {
          ...defaultExpect.unparseConfig,
          ...unparseConfig,
        },
        ...rest,
      };
    };

    const TEST_CASES: TestCase[] = [
      {},
      {
        exportConfig: undefined,
      },
      {
        exportConfig: {
          filename: "my file",
        },
        expectations: createExpectations({
          filename: "my_file.csv",
        }),
      },
      {
        exportConfig: {
          useTextFile: true,
        },
        expectations: createExpectations({
          filename: /\.txt$/,
        }),
      },
      {
        exportConfig: {
          title: "some-title",
          showTitle: true,
        },
        expectations: createExpectations({
          csvToSave: `some-title\r\n\n${testCsv}`,
        }),
      },
      {
        exportConfig: {
          useBom: false,
        },
        expectations: createExpectations({
          useBom: false,
        }),
      },
      {
        exportConfig: {
          unparseConfig: {
            delimiter: ",",
            header: false,
          },
        },
        expectations: createExpectations({
          unparseConfig: {
            delimiter: ",",
            header: false,
          },
        }),
      },
    ];

    it.each(TEST_CASES)(
      "exportConfig=$exportConfig",
      async ({ exportConfig, expectations }) => {
        const { result } = renderHook(() => useExport(exportConfig), {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        });

        let resultCSV = null;
        await act(async () => {
          resultCSV = await result.current.triggerExport();
        });

        expectations = expectations ?? defaultExpect;
        expect(resultCSV).toEqual(expectations.csvToSave);
        expect(papaparse.unparse).toHaveBeenCalledWith(
          posts,
          expectations.unparseConfig,
        );
        expect(downloadInBrowser).toHaveBeenCalledWith(
          expect.stringMatching(expectations.filename),
          `${expectations.useBom ? "\ufeff" : ""}${expectations.csvToSave}`,
          expect.stringContaining(
            exportConfig?.useTextFile ? "text/plain" : "text/csv",
          ),
        );
      },
    );
  });
  it("should now download when set to false", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          download: false,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    let resultCSV = null;
    await act(async () => {
      resultCSV = await result.current.triggerExport();
    });

    expect(resultCSV).toEqual(testCsv);
    expect(downloadInBrowser).not.toHaveBeenCalled();
  });
});
