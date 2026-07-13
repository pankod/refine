import nock from "nock";
import qs from "qs";
import { API_URL, createDataProvider } from "..";

const CUSTOM_API_URL = "https://custom.com";

describe("custom", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      headers: { "x-custom-header-default": "default" },
    },
  );

  describe("queryParams", () => {
    const response = { customResult: { id: 1 } };

    const queryParams = { foo: { bar: { baz: "test" } } };

    nock(CUSTOM_API_URL)
      .get("/custom-query-params")
      .matchHeader("x-custom-header-default", "default")
      .query(queryParams)
      .reply(200, response);

    it("should return the data", async () => {
      const result = await dataProvider.custom?.({
        method: "get",
        url: `${CUSTOM_API_URL}/custom-query-params`,
        query: queryParams,
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("headers", () => {
    const response = { customResult: { id: 1 } };

    nock(CUSTOM_API_URL)
      .get("/custom-headers")
      .matchHeader("x-custom-header", "custom")
      .matchHeader("x-custom-header-default", "default")
      .reply(200, response);

    it("should return the data", async () => {
      const result = await dataProvider.custom?.({
        method: "get",
        url: `${CUSTOM_API_URL}/custom-headers`,
        headers: { "x-custom-header": "custom" },
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("get", () => {
    const response = { customResult: { id: 1 } };

    nock(CUSTOM_API_URL).get("/custom-get").reply(200, response);

    it("should return the data", async () => {
      const result = await dataProvider.custom?.({
        method: "get",
        url: `${CUSTOM_API_URL}/custom-get`,
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("post", () => {
    const variables = { customPost: "customPost" };

    const response = { customPostResult: { id: 1, ...variables } };

    nock(CUSTOM_API_URL).post("/custom-post", variables).reply(201, response);

    it("should return the data", async () => {
      const result = await dataProvider.custom?.({
        method: "post",
        url: `${CUSTOM_API_URL}/custom-post`,
        payload: variables,
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("put", () => {
    const variables = { customPut: "customPut" };

    const response = { customPutResult: { id: 1, ...variables } };

    nock(CUSTOM_API_URL).put("/custom-put", variables).reply(200, response);

    it("should return the data", async () => {
      const result = await dataProvider.custom?.({
        method: "put",
        url: `${CUSTOM_API_URL}/custom-put`,
        payload: variables,
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("patch", () => {
    const variables = { customPatch: "customPatch" };

    const response = { customPatchResult: { id: 1, ...variables } };

    nock(CUSTOM_API_URL).patch("/custom-patch", variables).reply(200, response);

    it("should return the data", async () => {
      const result = await dataProvider.custom?.({
        method: "patch",
        url: `${CUSTOM_API_URL}/custom-patch`,
        payload: variables,
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("delete", () => {
    const response = { customDeleteResult: { success: true } };

    nock(CUSTOM_API_URL).delete("/custom-delete").reply(200, response);

    it("should return the data", async () => {
      const result = await dataProvider.custom?.({
        method: "delete",
        url: `${CUSTOM_API_URL}/custom-delete`,
      });

      expect(result).toEqual({ data: response });
    });
  });
});
