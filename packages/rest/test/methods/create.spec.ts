import nock from "nock";
import { API_URL, createDataProvider } from "..";

const variables = { foo: "bar" };

describe("create", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      headers: { "x-default-header": "create" },
    },
  );

  describe("success", () => {
    it("should return the data", async () => {
      const response = {
        createResult: {
          id: 1,
          ...variables,
        },
      };

      nock(API_URL)
        .matchHeader("x-custom-header", "create")
        .matchHeader("x-default-header", "create")
        .post("/create", variables)
        .query({ queryParams: variables })
        .reply(201, response);

      const result = await dataProvider.create({
        resource: "create",
        variables,
        meta: {
          query: { queryParams: variables },
          headers: { "x-custom-header": "create" },
        },
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("failure", () => {
    it("should throw HttpError with message and statusCode", async () => {
      nock(API_URL).post("/create", variables).reply(400, {
        message: "Bad Request",
      });

      await expect(
        dataProvider.create({
          resource: "create",
          variables,
        }),
      ).rejects.toMatchObject({
        message: JSON.stringify({
          message: "Bad Request",
          variables,
        }),
        statusCode: 400,
      });
    });
  });
});
