import axios from "axios";

import { AuthHelper } from "../../src/helpers/auth";
import "./index.mock";

describe("auth", () => {
  describe("login", () => {
    it("correct response", async () => {
      const { login } = AuthHelper("http://localhost:1337/api");

      const { data } = await login("demo@refine.dev", "demodemo");

      expect(data.jwt).toBeTruthy();
      expect(data.user.email).toBe("demo@refine.dev");
      expect(data.user.username).toBe("demo@refine.dev");
    });
  });

  describe("me", () => {
    it("correct response", async () => {
      const { me } = AuthHelper("http://localhost:1337/api");

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM5NDgxNjgzLCJleHAiOjE2NDIwNzM2ODN9.yqfuYb-Mr7I_VDxd2pe6elDROGiA6vqvChY_xNIIPu8";
      const { data } = await me(token);

      expect(data.email).toBe("demo@refine.dev");
      expect(data.username).toBe("demo@refine.dev");
    });
  });
});
