import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("createMany", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).createMany!({
      resource: "blog_posts",
      variables: [
        {
          title: "Lorem Ipsum 1",
        },
        {
          title: "Lorem Ipsum 2",
        },
      ],
      meta: {
        documentId: "unique()",
      },
    });

    expect(data[0].title).toEqual("Lorem Ipsum 1");
    expect(data[0].id).toBeTruthy();
    expect(data[1].title).toEqual("Lorem Ipsum 2");
    expect(data[1].id).toBeTruthy();
  });
});
