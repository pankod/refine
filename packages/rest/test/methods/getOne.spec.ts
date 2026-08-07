import nock from "nock";
import { API_URL, createDataProvider } from "..";

const response = {
  getOneResult: {
    id: 1,
  },
};

const queryParams = { queryParams: { id: 1 } };

nock(API_URL)
  .matchHeader("x-default-header", "getOne")
  .matchHeader("x-custom-header", "getOne")
  .get("/getOne/1")
  .query(queryParams)
  .reply(200, response);

describe("getOne", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      headers: { "x-default-header": "getOne" },
    },
  );

  it("should return the data", async () => {
    const result = await dataProvider.getOne({
      id: 1,
      resource: "getOne",
      meta: {
        query: queryParams,
        headers: { "x-custom-header": "getOne" },
      },
    });

    expect(result).toEqual({ data: response });
  });
});
