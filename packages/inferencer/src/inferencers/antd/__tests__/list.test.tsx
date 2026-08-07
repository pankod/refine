import React from "react";
import { Route, Routes } from "react-router";

import { render, act, TestWrapper, waitFor } from "@test";
import { ListInferencer, renderer } from "../list";

describe("AntdListInferencer", () => {
  it("should match the snapshot", async () => {
    const Wrapper = TestWrapper({
      routerInitialEntries: ["/posts"],
      resources: [
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
          show: "/posts/show/:id",
          meta: {
            canDelete: true,
          },
        },
        {
          name: "categories",
          meta: {
            canEdit: true,
            canShow: true,
            canDelete: true,
          },
        },
        {
          name: "tags",
          meta: {
            canEdit: true,
            canShow: true,
            canDelete: true,
          },
        },
        {
          name: "users",
          meta: {
            canEdit: true,
            canShow: true,
            canDelete: true,
          },
        },
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

describe("AntdListInferencer > renderer", () => {
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
