import nock from "nock";
import { API_URL, createDataProvider } from "..";

const response = {
  deleteOneResult: {
    success: true,
  },
};

const queryParams = { queryParams: { id: 1 } };

nock(API_URL)
  .matchHeader("x-default-header", "deleteOne")
  .matchHeader("x-custom-header", "deleteOne")
  .delete("/deleteOne/1")
  .query(queryParams)
  .reply(200, response);

describe("deleteOne", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      headers: { "x-default-header": "deleteOne" },
    },
  );

  it("should return the data", async () => {
    const result = await dataProvider.deleteOne({
      id: 1,
      resource: "deleteOne",
      meta: {
        query: queryParams,
        headers: { "x-custom-header": "deleteOne" },
      },
    });

    expect(result).toEqual({ data: undefined });
  });
});
