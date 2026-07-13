import axios from "axios";

import { DataProvider } from "../../src/dataProvider";
import "./index.mock";

describe("dataProvider", () => {
  const API_URL = "http://localhost:1337/api";
  const axiosInstance = axios.create();

  beforeAll(() => {
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU1Mjc0MTIzLCJleHAiOjE2NTc4NjYxMjN9.Au8NsqnS2mjtKBHf1oRl-juEQ_l9JZrPk4Fsv4GsvVA";
  });

  // create
  describe("create", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).create({
        resource: "posts",
        variables: { title: "foo", content: "bar", cover: ["32"] },
      });

      expect(data.data.id).toBe(20);
      expect(data.data.attributes.title).toBe("foo");
      expect(data.data.attributes.content).toBe("bar");
    });
  });

  // deleteMany
  describe("deleteMany", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).deleteMany!({
        resource: "posts",
        ids: ["20"],
      });

      expect(data[0].data.id).toBe(20);
      expect(data[0].data.attributes.title).toBe("foo");
      expect(data[0].data.attributes.content).toBe("bar");
    });
  });

  // deleteOne
  describe("deleteOne", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).deleteOne({
        resource: "posts",
        id: "18",
      });

      expect(data.data.id).toBe(18);
      expect(data.data.attributes.title).toBe("foo");
      expect(data.data.attributes.content).toBe("bar");
    });
  });

  describe("getList", () => {
    it("correct response", async () => {
      const { data, total } = await DataProvider(
        API_URL,
        axiosInstance,
      ).getList({ resource: "posts" });

      expect(data[2].id).toBe(17);
      expect(data[2].title).toBe("foo");
      expect(data[2].content).toBe("bar");
      expect(total).toBe(6);
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

      expect(data[0].id).toBe(21);
      expect(data[0].title).toBe("foo");
      expect(data[0].content).toBe("bar");
      expect(total).toBe(6);
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

      expect(data[0].title).toBe("foo");
      expect(data.length).toBe(3);
    });

    it("correct locale response", async () => {
      const { data, total } = await DataProvider(
        API_URL,
        axiosInstance,
      ).getList({
        resource: "posts",
        meta: {
          locale: "de",
        },
      });

      expect(data[0].title).toBe("Hello");
      expect(data[0].locale).toBe("de");
      expect(total).toBe(3);
    });

    it("correct fields response", async () => {
      const { data, total } = await DataProvider(
        API_URL,
        axiosInstance,
      ).getList({
        resource: "posts",
        meta: {
          fields: ["title", "content"],
        },
      });

      expect(data[0]).toEqual({
        id: 5,
        title: "Lorem ipsum began as scrambled",
        content:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
      });
      expect(total).toBe(4);
    });

    it("correct populated response", async () => {
      const { data, total } = await DataProvider(
        API_URL,
        axiosInstance,
      ).getList({
        resource: "posts",
        meta: {
          populate: ["category"],
        },
      });

      expect(data[0].category).toBeTruthy();
      expect(total).toBe(4);
    });
  });

  // getMany
  describe("getMany", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).getMany!({
        resource: "posts",
        ids: ["30", "29"],
        meta: { populate: ["category"] },
      });

      expect(data[0].id).toBe(29);
      expect(data[0].title).toBe("Hello");
      expect(data[0].content).toBe("Testtt ");

      expect(data[1].id).toBe(30);
      expect(data[1].category.id).toBe(12);
    });
  });

  // getOne
  describe("getOne", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).getOne({
        resource: "posts",
        id: "8",
      });

      expect(data.id).toBe(8);
      expect(data.title).toBe("Hello");
      expect(data.content).toBe("New post content");
    });
  });

  // updateOne
  describe("updateOne", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).update({
        resource: "posts",
        id: "8",
        variables: {
          title: "Updated Title",
        },
      });
      expect(data.data.id).toBe(8);
      expect(data.data.attributes.title).toBe("Updated Title");
    });
  });

  // updateMany
  describe("updateMany", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).updateMany!({
        resource: "posts",
        ids: ["8", "17"],
        variables: {
          title: "Updated titles",
        },
      });

      expect(data[0].data.id).toBe(8);
      expect(data[0].data.attributes.title).toBe("Updated titles");

      expect(data[1].data.id).toBe(17);
      expect(data[1].data.attributes.title).toBe("Updated titles");
    });
  });

  // createMany
  describe("createMany", () => {
    it("correct response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).createMany!({
        resource: "posts",
        variables: [
          {
            title: "New Post One",
            content: "New Content One",
          },
          {
            title: "New Post Two",
            content: "New Content Two",
          },
        ],
      });

      expect(data[0].data.id).toBe(29);
      expect(data[0].data.attributes.title).toBe("New Post One");

      expect(data[1].data.id).toBe(30);
      expect(data[1].data.attributes.title).toBe("New Post Two");
    });
  });

  describe("custom", () => {
    it("correct get response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).custom!({
        url: `${API_URL}/posts`,
        method: "get",
      });

      expect(data.data[0].id).toBe(5);
      expect(data.data[0].attributes.title).toBe(
        "Lorem ipsum began as scrambled",
      );
    });

    it("correct filter response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).custom!({
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

      expect(data.data[0].id).toBe(19);
      expect(data.data[0].attributes.title).toBe("foo");
    });

    it("correct sort response", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).custom!({
        url: `${API_URL}/posts`,
        method: "get",
        sorters: [
          {
            field: "id",
            order: "desc",
          },
        ],
      });

      expect(data.data[0].id).toBe(37);
      expect(data.data[0].attributes.title).toBe("New Post Two");
    });

    it("correct post request", async () => {
      const { data } = await DataProvider(API_URL, axiosInstance).custom!({
        url: `${API_URL}/posts`,
        method: "post",
        payload: {
          data: {
            title: "test",
            content: "test",
          },
        },
      });

      expect(data.data).toEqual({
        id: 39,
        attributes: {
          title: "test",
          content: "test",
          createdAt: "2021-12-15T08:28:20.103Z",
          updatedAt: "2021-12-15T08:28:20.103Z",
          publishedAt: "2021-12-15T08:28:20.085Z",
          locale: "en",
        },
      });
    });
  });
});
