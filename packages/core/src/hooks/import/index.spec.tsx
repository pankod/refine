import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import * as papaparse from "papaparse";
import { act } from "react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useImport } from ".";
import type { DataProviders, HttpError } from "../../contexts/data/types";

vi.mock("papaparse", async () => {
  const actual = await vi.importActual("papaparse");
  const mockParse = vi.fn((actual as any).parse);
  return {
    default: {
      parse: mockParse,
    },
    parse: mockParse,
  };
});

const file = new File(
  [
    `"id","title","createdAt","updatedAt"
"35ad97dd-9379-480a-b6ac-6fc9c13e9224","Viral Strategist Local","2021-04-09T12:03:23.933Z","2021-04-09T12:03:23.933Z"
"9a428977-1b03-4c3e-8cdd-1e4e2813528a","Concrete Soap Neural","2021-04-09T12:03:23.835Z","2021-04-09T12:03:23.835Z"
"1a428977-1b03-4c3e-8cdd-1e4e281e9224","Strategist Soap Viral","2021-03-09T12:12:23.933Z","2021-03-09T12:12:23.933Z"`,
  ],
  "data.csv",
  { type: "text/csv" },
);

const parsedData = [
  {
    id: "35ad97dd-9379-480a-b6ac-6fc9c13e9224",
    title: "Viral Strategist Local",
    createdAt: "2021-04-09T12:03:23.933Z",
    updatedAt: "2021-04-09T12:03:23.933Z",
  },
  {
    id: "9a428977-1b03-4c3e-8cdd-1e4e2813528a",
    title: "Concrete Soap Neural",
    createdAt: "2021-04-09T12:03:23.835Z",
    updatedAt: "2021-04-09T12:03:23.835Z",
  },
  {
    id: "1a428977-1b03-4c3e-8cdd-1e4e281e9224",
    title: "Strategist Soap Viral",
    createdAt: "2021-03-09T12:12:23.933Z",
    updatedAt: "2021-03-09T12:12:23.933Z",
  },
];

describe("useImport hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render hook without crashing", () => {
    const result = renderHook(() => useImport(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    expect(result).toBeTruthy();
  });

  it("should call onProgress", async () => {
    const onProgressMock = vi.fn();
    const { result } = renderHook(
      () =>
        useImport({
          batchSize: 1,
          onProgress: onProgressMock,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          routerProvider: mockRouterProvider({
            pathname: "/posts",
            resource: { name: "posts" },
          }),
        }),
      },
    );

    await act(async () => {
      await result.current.handleChange?.({
        file: file,
      });
    });

    expect(onProgressMock).toHaveBeenCalledWith({
      totalAmount: parsedData.length,
      processedAmount: 3,
    });
  });

  it("should trigger parse", async () => {
    const { result } = renderHook(
      () =>
        useImport({
          onFinish: async () => {
            expect(papaparse.parse).toHaveBeenCalled();
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.handleChange?.({
        file: file,
      });
    });
  });

  it("should call mutate method of result of useCreateMany many times with correct values in if batchSize is 2", async () => {
    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        createMany: vi.fn(),
      },
    } as DataProviders;

    const { result } = renderHook(
      () =>
        useImport({
          batchSize: 2,
          onFinish: async () => {
            expect(mockDataProvider.default?.createMany).toHaveBeenCalledWith(
              expect.objectContaining({
                resource: "posts",
                variables: [parsedData[0], parsedData[1]].map((parsedData) => ({
                  ...parsedData,
                })),
              }),
            );

            expect(mockDataProvider.default?.createMany).toHaveBeenCalledWith(
              expect.objectContaining({
                resource: "posts",
                variables: [parsedData[0], parsedData[1]].map((parsedData) => ({
                  ...parsedData,
                })),
              }),
            );
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider,
          resources: [{ name: "posts" }],
          routerProvider: mockRouterProvider({
            pathname: "/posts",
            resource: { name: "posts" },
          }),
        }),
      },
    );

    await act(async () => {
      await result.current.handleChange({
        file: file,
      });
    });
  });

  it("should map data successfully before it uploads to server", async () => {
    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        createMany: vi.fn(),
      },
    } as DataProviders;

    const { result } = renderHook(
      () =>
        useImport({
          mapData: (data) => ({
            id: data.id,
            newTitle: data.title,
          }),
          onFinish: () => {
            expect(mockDataProvider.default?.createMany).toHaveBeenCalledWith(
              expect.objectContaining({
                resource: "posts",
                variables: parsedData.map((parsedData) => ({
                  id: parsedData.id,
                  newTitle: parsedData.title,
                })),
              }),
            );
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider,
          resources: [{ name: "posts" }],
          routerProvider: mockRouterProvider({
            pathname: "/posts",
            resource: { name: "posts" },
          }),
        }),
      },
    );

    await act(async () => {
      await result.current.handleChange({
        file: file,
      });
    });
  });

  it("should send request for the specified resource", async () => {
    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        createMany: vi.fn(),
      },
    } as DataProviders;

    const { result } = renderHook(
      () =>
        useImport({
          resource: "tests",
          onFinish: () => {
            expect(mockDataProvider.default?.createMany).toHaveBeenCalledWith(
              expect.objectContaining({
                resource: "tests",
                variables: parsedData.map((parsedData) => ({
                  ...parsedData,
                })),
              }),
            );
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.handleChange({
        file: file,
      });
    });
  });

  describe("batchSize = undefined", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation((message) => {
        if (message?.message === "something happened") return;
        console.warn(message);
      });
    });

    it("should call mutate method of result of useCreateMany one time with correct values if batchSize=undefined", async () => {
      const mockDataProvider = {
        default: {
          ...MockJSONServer.default,
          createMany: vi.fn(),
        },
      } as DataProviders;

      const { result } = renderHook(
        () =>
          useImport({
            batchSize: undefined,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: mockDataProvider,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.handleChange({
          file: file,
        });
      });
    });

    it("should give successes in onFinish callback if batchSize=undefined", async () => {
      const mockDataProvider = {
        default: {
          ...MockJSONServer.default,
          createMany: vi.fn(async () => {
            return {
              data: parsedData,
            };
          }),
        },
      } as DataProviders;

      const { result } = renderHook(
        () =>
          useImport({
            resource: "posts",
            onFinish: ({ succeeded }) => {
              expect(succeeded[0].request).toEqual(parsedData);
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: mockDataProvider,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.handleChange({
          file: file,
        });
      });
    });

    it("should give errors in onFinish callback if batchSize=undefined", async () => {
      const mockDataProvider = {
        default: {
          ...MockJSONServer.default,
          createMany: () => {
            const customError: HttpError = {
              message: "something happened",
              statusCode: 500,
            };

            return Promise.reject(customError);
          },
        },
      } as DataProviders;

      const { result } = renderHook(
        () =>
          useImport({
            resource: "posts",
            onFinish: ({ errored }) => {
              expect(errored[0].response[0]).toEqual({
                message: "something happened",
                statusCode: 500,
              });
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: mockDataProvider,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.handleChange({
          file: file,
        });
      });
    });
  });

  describe("batchSize = 1", () => {
    it("should call mutate method of result of useCreate many times with correct values if batchSize is 1", async () => {
      const mockDataProvider = {
        default: {
          ...MockJSONServer.default,
          create: vi.fn(),
        },
      } as DataProviders;

      const { result } = renderHook(
        () =>
          useImport({
            batchSize: 1,
            onFinish: () => {
              expect(mockDataProvider.default?.create).toHaveBeenCalledWith(
                expect.objectContaining({
                  resource: "posts",
                  variables: parsedData[0],
                }),
              );
              expect(mockDataProvider.default?.create).toHaveBeenCalledWith(
                expect.objectContaining({
                  resource: "posts",
                  variables: parsedData[1],
                }),
              );
              expect(mockDataProvider.default?.create).toHaveBeenCalledWith(
                expect.objectContaining({
                  resource: "posts",
                  variables: parsedData[2],
                }),
              );
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: mockDataProvider,
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              pathname: "/posts",
              resource: { name: "posts" },
            }),
          }),
        },
      );

      await act(async () => {
        await result.current.handleChange({
          file: file,
        });
      });
    });

    it("should give successes in onFinish callback if batchSize=1", async () => {
      const mockDataProvider = {
        default: {
          ...MockJSONServer.default,
          create: async ({ variables }: any) => {
            if (variables.title === "Viral Strategist Local") {
              return {
                data: parsedData[0],
              };
            }

            if (variables.title === "Concrete Soap Neural") {
              return {
                data: parsedData[1],
              };
            }

            if (variables.title === "Strategist Soap Viral") {
              return {
                data: parsedData[2],
              };
            }

            return {
              data: parsedData[0],
            };
          },
        },
      } as DataProviders;

      const { result } = renderHook(
        () =>
          useImport({
            batchSize: 1,
            resource: "posts",
            onFinish: ({ succeeded }) => {
              expect(succeeded[0].response[0]).toEqual(parsedData[0]);
              expect(succeeded[1].response[0]).toEqual(parsedData[1]);
              expect(succeeded[2].response[0]).toEqual(parsedData[2]);
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: mockDataProvider,
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              pathname: "/posts",
              resource: { name: "posts" },
            }),
          }),
        },
      );

      await act(async () => {
        await result.current.handleChange({
          file: file,
        });
      });
    });

    it("should onChange call handleChange", async () => {
      const onProgressMock = vi.fn();

      const { result } = renderHook(
        () =>
          useImport({
            batchSize: 1,
            onProgress: onProgressMock,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              pathname: "/posts",
              resource: { name: "posts" },
            }),
          }),
        },
      );

      const {
        inputProps: { onChange },
      } = result.current;

      await act(async () => {
        onChange({ target: { files: [file] } } as any);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await waitFor(() => {
        expect(onProgressMock).toHaveBeenCalledWith({
          totalAmount: parsedData.length,
          processedAmount: 3,
        });
      });
    });
  });
});
