import axios from "axios";

import { AuthHelper } from "../../src/helpers/auth";
import "./index.mock";

describe("auth", () => {
  describe("login", () => {
    it("correct response", async () => {
      const { login } = AuthHelper("https://api.strapi.refine.dev");

      const { data } = await login("demo", "demo123");

      expect(data.jwt).toBeTruthy();
      expect(data.user.email).toBe("demo@mail.com");
      expect(data.user.username).toBe("demo");
    });
  });

  describe("me", () => {
    it("correct response", async () => {
      const { me } = AuthHelper("https://api.strapi.refine.dev");

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5OTUzODU5LCJleHAiOjE2MjI1NDU4NTl9.hndbp-vtQ65VPafTE05E6Wbg0OKzNJnSKyBRjO9MHg4";
      const { data } = await me(token);

      expect(data.email).toBe("demo@mail.com");
      expect(data.username).toBe("demo");
    });
  });
});
