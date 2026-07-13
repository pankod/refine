import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("updateMany", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).updateMany!({
      resource: "blog_posts",
      ids: ["669e49f3001cb7c76d6b", "669e49f30008c2067f82"],
      variables: {
        title: "Lorem Ipsum",
      },
    });

    expect(data[0].id).toEqual("669e49f3001cb7c76d6b");
    expect(data[0].title).toEqual("Lorem Ipsum");

    expect(data[1].id).toEqual("669e49f30008c2067f82");
    expect(data[1].title).toEqual("Lorem Ipsum");
  });
});
