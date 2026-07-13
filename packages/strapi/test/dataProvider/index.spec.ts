import axios from "axios";

import { DataProvider } from "../../src/dataProvider";
import "./index.mock";

describe("dataProvider", () => {
  const API_URL = "https://api.strapi.refine.dev";
  const axiosInstance = axios.create();

  beforeAll(() => {
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5OTUzODU5LCJleHAiOjE2MjI1NDU4NTl9.hndbp-vtQ65VPafTE05E6Wbg0OKzNJnSKyBRjO9MHg4";
  });

  // create
  describe("create", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).create({
        resource: "posts",
        variables: { title: "foo", content: "bar", cover: ["116"] },
      });

      expect(data["title"]).toBe("foo");
      expect(data["content"]).toBe("bar");
      expect(data["cover"]["id"]).toBe(116);
    });
  });

  // deleteMany
  describe("deleteMany", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).deleteMany!({
        resource: "posts",
        ids: ["46"],
      });

      expect(data[0]["id"]).toBe(46);
      expect(data[0]["title"]).toBe("tiger");
      expect(data[0]["content"]).toBe("tiger");
    });
  });

  // deleteOne
  describe("deleteOne", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).deleteOne({
        resource: "posts",
        id: "47",
      });

      expect(data["id"]).toBe(47);
      expect(data["title"]).toBe("test");
      expect(data["content"]).toBe("test");
    });
  });

  describe("getList", () => {
    it("correct response", async () => {
      const { data, total } = await DataProvider(
        API_URL,
        axiosInstance,
      ).getList({ resource: "posts" });

      expect(data[0]["id"]).toBe(49);
      expect(data[0]["title"]).toBe("0001");
      expect(total).toBe(5);
    });

    it("correct sorting response", async () => {
      const { data, total } = await DataProvider(
        API_URL,
        axiosInstance,
      ).getList({
        resource: "posts",
        sorters: [
          {
            field: "id",
            order: "desc",
          },
        ],
      });

      expect(data[0]["id"]).toBe(53);
      expect(data[0]["title"]).toBe("foo");
      expect(total).toBe(5);
    });

    it("correct filter response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).getList({
        resource: "posts",
        filters: [
          {
            field: "title",
            operator: "eq",
            value: "foo",
          },
        ],
      });

      expect(data[0]["title"]).toBe("foo");
      expect(data.length).toBe(3);
    });

    it("correct filter and sort response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).getList({
        resource: "posts",
        filters: [
          {
            field: "title",
            operator: "eq",
            value: "foo",
          },
        ],
        sorters: [
          {
            field: "id",
            order: "desc",
          },
        ],
      });

      expect(data[0]["title"]).toBe("foo");
      expect(data.length).toBe(3);
    });
  });

  // getMany
  describe("getMany", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).getMany!({
        resource: "posts",
        ids: ["49"],
      });

      expect(data[0]["id"]).toBe(49);
      expect(data[0]["title"]).toBe("0001");
      expect(data[0]["content"]).toBe("0001");
    });
  });

  // getOne
  describe("getOne", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).getOne({
        resource: "posts",
        id: "49",
      });

      expect(data["id"]).toBe(49);
      expect(data["title"]).toBe("0001");
      expect(data["content"]).toBe("0001");
    });
  });

  // updateOne
  describe("updateOne", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).update({
        resource: "posts",
        id: "49",
        variables: {
          title: "updated",
        },
      });
      expect(data["id"]).toBe(49);
      expect(data["title"]).toBe("updated");
    });
  });

  // updateMany
  describe("updateMany", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).updateMany!({
        resource: "posts",
        ids: ["50", "51"],
        variables: {
          title: "updated",
        },
      });

      expect(data[0]["id"]).toBe(50);
      expect(data[0]["title"]).toBe("updated");

      expect(data[1]["id"]).toBe(51);
      expect(data[1]["title"]).toBe("updated");
    });
  });

  describe("custom", () => {
    it("correct get response", async () => {
      const response = await DataProvider(API_URL, axios).custom!({
        url: `${API_URL}/posts`,
        method: "get",
      });

      expect(response.data[0]["id"]).toBe(49);
      expect(response.data[0]["title"]).toBe("updated");
    });

    it("correct filter response", async () => {
      const response = await DataProvider(API_URL, axios).custom!({
        url: `${API_URL}/posts`,
        method: "get",
        filters: [
          {
            field: "title",
            operator: "eq",
            value: "foo",
          },
        ],
      });

      expect(response.data[0]["id"]).toBe(52);
      expect(response.data[0]["title"]).toBe("foo");
    });

    it("correct sort response", async () => {
      const response = await DataProvider(API_URL, axios).custom!({
        url: `${API_URL}/posts`,
        method: "get",
        sorters: [
          {
            field: "id",
            order: "asc",
          },
        ],
      });

      expect(response.data[0]["id"]).toBe(49);
      expect(response.data[0]["title"]).toBe("updated");
    });

    it("correct post request", async () => {
      const response = await DataProvider(API_URL, axios).custom!({
        url: `${API_URL}/posts`,
        method: "post",
        payload: {
          title: "test",
          content: "test",
        },
      });

      expect(response.data).toEqual({
        id: 55,
        title: "test",
        content: "test",
        aaaa: null,
        published_at: "2021-05-21T13:39:16.446Z",
        created_at: "2021-05-21T13:39:16.458Z",
        updated_at: "2021-05-21T13:39:16.458Z",
        category: null,
        cover: null,
      });
    });
  });
});
