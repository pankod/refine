import React from "react";
import { Route, Routes } from "react-router";

import { render, act, TestWrapper } from "@test";
import { ListInferencer, renderer } from "../list";

describe("HeadlessListInferencer", () => {
  it("should match the snapshot", async () => {
    const Wrapper = TestWrapper({
      routerInitialEntries: ["/posts"],
      resources: [
        {
          name: "posts",
          list: "/posts",
        },
        {
          name: "categories",
        },
        {
          name: "tags",
        },
        { name: "users" },
      ],
    });

    const rendering = render(
      <Wrapper>
        <Routes>
          <Route
            path="/:resource"
            element={<ListInferencer resource="posts" />}
          />
        </Routes>
      </Wrapper>,
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const node = rendering.asFragment();

    expect(node).toMatchSnapshot();
  });
});

describe("HeadlessListInferencer > renderer", () => {
  it("should use `PostList` name when resource is `posts`", () => {
    expect(
      renderer({
        infer: () => null,
        resources: [],
        isCustomPage: false,
        fields: [],
        resource: {
          name: "posts",
        },
      }),
    ).toContain("export const PostList");
  });
  it("should use `InferredList` name when resource label is empty", () => {
    expect(
      renderer({
        infer: () => null,
        resources: [],
        isCustomPage: false,
        fields: [],
        resource: {
          name: "",
        },
      }),
    ).toContain("export const InferredList");
  });
  it("should use `InferredList` name when resource label is non [a-zA-Z] (Chinese)", () => {
    expect(
      renderer({
        infer: () => null,
        resources: [],
        isCustomPage: false,
        fields: [],
        resource: {
          name: "用户",
        },
      }),
    ).toContain("export const InferredList");
  });
  it("should use `InferredList` name when resource label is non [a-zA-Z] (Cyrillic)", () => {
    expect(
      renderer({
        infer: () => null,
        resources: [],
        isCustomPage: false,
        fields: [],
        resource: {
          name: "пользователи",
        },
      }),
    ).toContain("export const InferredList");
  });
});
