import React from "react";
import { Route, Routes } from "react-router";

import { render, act, TestWrapper } from "@test";
import { CreateInferencer, renderer } from "../create";

describe("HeadlessCreateInferencer", () => {
  it("should match the snapshot", async () => {
    const Wrapper = TestWrapper({
      routerInitialEntries: ["/posts/create"],
      resources: [
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
            path="/:resource/create"
            element={<CreateInferencer resource="posts" />}
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

    const node = rendering.asFragment();

    expect(node).toMatchSnapshot();
  });
});

describe("HeadlessCreateInferencer > renderer", () => {
  it("should use `PostCreate` name when resource is `posts`", () => {
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
    ).toContain("export const PostCreate");
  });
  it("should use `InferredCreate` name when resource label is empty", () => {
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
    ).toContain("export const InferredCreate");
  });
  it("should use `InferredCreate` name when resource label is non [a-zA-Z] (Chinese)", () => {
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
    ).toContain("export const InferredCreate");
  });
  it("should use `InferredCreate` name when resource label is non [a-zA-Z] (Cyrillic)", () => {
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
    ).toContain("export const InferredCreate");
  });
});
