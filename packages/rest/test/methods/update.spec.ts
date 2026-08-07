import nock from "nock";
import { API_URL, createDataProvider } from "..";

const variables = { foo: "bar" };

const response = {
  updateResult: {
    id: 1,
    ...variables,
  },
};

const queryParams = { queryParams: variables };

describe("update", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    { headers: { "x-default-header": "update" } },
  );

  describe("patch", () => {
    describe("success", () => {
      nock(API_URL)
        .matchHeader("x-custom-header", "update")
        .matchHeader("x-default-header", "update")
        .patch("/update/1", variables)
        .query(queryParams)
        .reply(200, response);

      it("should return the data", async () => {
        const result = await dataProvider.update({
          id: 1,
          resource: "update",
          variables,
          meta: {
            query: queryParams,
            headers: { "x-custom-header": "update" },
          },
        });

        expect(result).toEqual({ data: response });
      });
    });

    describe("put", () => {
      describe("from dataprovider config", () => {
        nock(API_URL).put("/update/1", variables).reply(200, response);

        const { dataProvider } = createDataProvider(API_URL, {
          update: {
            getRequestMethod(params) {
              return "put";
            },
          },
        });

        it("should make request using PUT method", async () => {
          const result = await dataProvider.update({
            id: 1,
            resource: "update",
            variables,
          });

          expect(result).toEqual({ data: response });
        });
      });

      describe('from "method" parameter', () => {
        nock(API_URL).put("/update/1", variables).reply(200, response);

        it("should make request using PUT method", async () => {
          const result = await dataProvider.update({
            id: 1,
            resource: "update",
            variables,
            meta: {
              method: "put",
            },
          });

          expect(result).toEqual({ data: response });
        });
      });
    });
  });

  describe("failure", () => {
    it("should throw HttpError with message and statusCode", async () => {
      nock(API_URL).patch("/update/1", variables).reply(400, {
        message: "Bad Request",
      });

      await expect(
        dataProvider.update({
          id: 1,
          resource: "update",
          variables,
        }),
      ).rejects.toMatchObject({
        message: JSON.stringify({
          message: "Bad Request",
          id: 1,
          variables,
        }),
        statusCode: 400,
      });
    });
  });
});
