import nock from "nock";
import { createDataProvider } from "../create-data-provider";
import { authHeaderBeforeRequestHook } from "./auth-header.before-request.hook";

const API_URL = "https://example.com";
const ACCESS_TOKEN_KEY = "accessToken";

const HEADER_NAME = "Authorization";
const TOKEN = "my-test-token";

describe("auth", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      hooks: {
        beforeRequest: [authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY })],
      },
    },
  );

  it("should add Authorization header", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, TOKEN);

    nock(API_URL)
      .matchHeader(HEADER_NAME, `Bearer ${TOKEN}`)
      .get("/posts")
      .reply(200, {});

    await dataProvider.getList({ resource: "posts" });
  });
});
