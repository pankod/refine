import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("createMany", () => {
  it("correct response with `select`", async () => {
    const { data } = await dataProvider(supabaseClient).createMany!({
      resource: "posts",
      variables: [
        {
          title: "foo",
          slug: "foo-bar",
          content: "bar",
          categoryId: 2,
        },
        {
          title: "foo-2",
          slug: "foo-bar-2",
          content: "bar-2",
          categoryId: 1,
        },
      ],
      meta: {
        select: "*",
      },
    });

    expect(data[0]["id"]).toEqual(12895);
    expect(data[0]["title"]).toEqual("foo");
    expect(data[0]["slug"]).toEqual("foo-bar");
    expect(data[0]["content"]).toEqual("bar");
    expect(data[0]["categoryId"]).toEqual(2);

    expect(data[1]["id"]).toEqual(12896);
    expect(data[1]["title"]).toEqual("foo-2");
    expect(data[1]["slug"]).toEqual("foo-bar-2");
    expect(data[1]["content"]).toEqual("bar-2");
    expect(data[1]["categoryId"]).toEqual(1);
  });

  it("should change schema", async () => {
    const { data } = await dataProvider(supabaseClient).createMany({
      resource: "posts",
      variables: [
        {
          title: "foo",
          slug: "foo-bar",
          content: "bar",
          categoryId: 2,
        },
        {
          title: "foo-2",
          slug: "foo-bar-2",
          content: "bar-2",
          categoryId: 1,
        },
      ],
      meta: {
        schema: "public",
        select: "*",
      },
    });

    expect(data[0]["title"]).toEqual("foo");
    expect(data[1]["title"]).toEqual("foo-2");

    await expect(
      dataProvider(supabaseClient).createMany({
        resource: "posts",
        variables: [],
        meta: {
          schema: "private",
        },
      }),
    ).rejects.toMatchObject({ code: "PGRST106" });
  });
});
