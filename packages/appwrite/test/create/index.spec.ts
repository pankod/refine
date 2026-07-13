import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("create", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).create({
      resource: "blog_posts",
      variables: {
        title: "Lorem Ipsum",
      },
      meta: {
        documentId: "unique()",
      },
    });

    expect(data.title).toEqual("Lorem Ipsum");
    expect(data.id).toBeTruthy();
  });
  it("should respect meta.documentId", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).create({
      resource: "blog_posts",
      variables: {
        title: "Lorem Ipsum",
      },
      meta: {
        documentId: "lorem_ipsum",
      },
    });

    expect(data.title).toEqual("Lorem Ipsum");
    expect(data.id).toEqual("lorem_ipsum");
  });
});
