import nock from "nock";
import { API_URL, createDataProvider } from "..";

const response = [{ id: 1 }, { id: 2 }];
const queryParams = { ids: "1,2" };

describe("getMany", () => {
  describe("when getMany method is defined", () => {
    it("should return the data", async () => {
      nock.cleanAll();
      nock(API_URL)
        .matchHeader("x-default-header", "getMany")
        .matchHeader("x-custom-header", "getMany")
        .get("/getMany")
        .query(queryParams)
        .reply(200, response);

      const { dataProvider } = createDataProvider(
        API_URL,
        {
          getMany: {
            buildHeaders: async (params) => {
              return params.meta?.headers ?? {};
            },
            buildQueryParams: async (params) => {
              return {
                ids: params.ids.join(","),
              };
            },
            mapResponse: async (response, _params): Promise<any[]> => {
              return await response.json();
            },
          },
        },
        {
          headers: { "x-default-header": "getMany" },
        },
      );
      const result = await dataProvider.getMany!({
        ids: [1, 2],
        resource: "getMany",
        meta: {
          headers: { "x-custom-header": "getMany" },
        },
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("when getMany method is not defined", () => {
    it("should return undefined", async () => {
      const { dataProvider } = createDataProvider(
        API_URL,
        {},
        {
          headers: { "x-default-header": "getMany" },
        },
      );

      expect(dataProvider.getMany).toBeUndefined();
    });
  });
});
