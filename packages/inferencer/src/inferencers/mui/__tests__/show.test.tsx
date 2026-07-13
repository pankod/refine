import React from "react";
import { Route, Routes } from "react-router";

import { act, render, TestWrapper } from "@test";
import { renderer, ShowInferencer } from "../show";

describe("MuiShowInferencer", () => {
  it("should match the snapshot", async () => {
    const Wrapper = TestWrapper({
      routerInitialEntries: ["/posts/show/11"],
      resources: [
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
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
            path="/:resource/show/:id"
            element={<ShowInferencer resource="posts" />}
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

describe("ShowInferencer > renderer", () => {
  it("should use `PostShow` name when resource is `posts`", () => {
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
    ).toContain("export const PostShow");
  });
  it("should use `InferredShow` name when resource label is empty", () => {
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
    ).toContain("export const InferredShow");
  });
  it("should use `InferredShow` name when resource label is non [a-zA-Z] (Chinese)", () => {
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
    ).toContain("export const InferredShow");
  });
  it("should use `InferredShow` name when resource label is non [a-zA-Z] (Cyrillic)", () => {
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
    ).toContain("export const InferredShow");
  });
});
