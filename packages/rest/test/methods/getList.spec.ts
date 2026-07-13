import nock from "nock";
import { API_URL, createDataProvider } from "..";

const response = [{ id: 1 }];

nock(API_URL)
  .matchHeader("x-default-header", "getList")
  .matchHeader("x-custom-header", "getList")
  .get("/getList")
  .query({
    filters: [{ field: "name", operator: "eq", value: "john" }],
    sorters: [{ field: "createdAt", order: "desc" }],
    pagination: { currentPage: 1, pageSize: 10 },
    extra: { test: 1 },
  })
  .reply(200, response);

describe("getList", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      headers: { "x-default-header": "getList" },
    },
  );

  it("should return the data", async () => {
    const result = await dataProvider.getList({
      resource: "getList",
      filters: [{ field: "name", operator: "eq", value: "john" }],
      sorters: [{ field: "createdAt", order: "desc" }],
      pagination: { currentPage: 1, pageSize: 10 },
      meta: {
        query: { extra: { test: "1" } },
        headers: { "x-custom-header": "getList" },
      },
    });
    expect(result.data).toEqual(response);
    expect(result.total).toEqual(-1);
  });
});
