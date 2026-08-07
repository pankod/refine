import React from "react";
import { Route, Routes } from "react-router";

import { render, act, TestWrapper } from "@test";
import { EditInferencer, renderer } from "../edit";

describe("ChakraEditInferencer", () => {
  it("should match the snapshot", async () => {
    const Wrapper = TestWrapper({
      routerInitialEntries: ["/posts/edit/11"],
      resources: [
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
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
            path="/:resource/edit/:id"
            element={<EditInferencer resource="posts" />}
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

describe("ChakraEditInferencer > renderer", () => {
  it("should use `PostEdit` name when resource is `posts`", () => {
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
    ).toContain("export const PostEdit");
  });
  it("should use `InferredEdit` name when resource label is empty", () => {
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
    ).toContain("export const InferredEdit");
  });
  it("should use `InferredEdit` name when resource label is non [a-zA-Z] (Chinese)", () => {
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
    ).toContain("export const InferredEdit");
  });
  it("should use `InferredEdit` name when resource label is non [a-zA-Z] (Cyrillic)", () => {
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
    ).toContain("export const InferredEdit");
  });
});
