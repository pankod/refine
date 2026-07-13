import nock from "nock";
import { createDataProvider } from "../create-data-provider";
import { authHeaderBeforeRequestHook } from "./auth-header.before-request.hook";
import { refreshTokenAfterResponseHook } from "./refresh-token.after-response.hook";

const API_URL = "https://example.com";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const CURRENT_TOKEN = "current-token";
const CURRENT_REFRESH_TOKEN = "current-refresh-token";

const NEW_TOKEN = "new-token";
const NEW_REFRESH_TOKEN = "new-refresh-token";

const REFRESH_TOKEN_URL = `${API_URL}/refresh-token`;

describe("auth", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      hooks: {
        beforeRequest: [authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY })],
        afterResponse: [
          refreshTokenAfterResponseHook({
            ACCESS_TOKEN_KEY,
            REFRESH_TOKEN_KEY,
            REFRESH_TOKEN_URL,
          }),
        ],
      },
    },
  );

  it("should add Authorization header", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, CURRENT_TOKEN);
    localStorage.setItem(REFRESH_TOKEN_KEY, CURRENT_REFRESH_TOKEN);

    nock(API_URL)
      .matchHeader("Authorization", `Bearer ${CURRENT_TOKEN}`)
      .get("/posts")
      .reply(401, {});

    nock(API_URL)
      .post("/refresh-token", { refreshToken: CURRENT_REFRESH_TOKEN })
      .reply(200, { token: NEW_TOKEN, refreshToken: NEW_REFRESH_TOKEN });

    nock(API_URL)
      .matchHeader("Authorization", `Bearer ${NEW_TOKEN}`)
      .get("/posts")
      .reply(200, [{ id: 1 }]);

    const result = await dataProvider.getList({ resource: "posts" });

    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toEqual(NEW_TOKEN);
    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toEqual(NEW_REFRESH_TOKEN);

    expect(result.data).toEqual([{ id: 1 }]);
    expect(result.total).toEqual(-1);
  });
});
