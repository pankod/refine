import React from "react";
import { Route, Routes } from "react-router";

import { render, act, TestWrapper } from "@test";
import { MantineInferencer } from "../index";

describe("MantineInferencer", () => {
  it("should match the snapshot", async () => {
    const Wrapper = TestWrapper({
      routerInitialEntries: ["/custom-page"],
    });

    const renderingList = render(
      <Wrapper>
        <Routes>
          <Route
            path="/custom-page"
            element={<MantineInferencer resource="posts" action="list" />}
          />
        </Routes>
      </Wrapper>,
    );

    const renderingCreate = render(
      <Wrapper>
        <Routes>
          <Route
            path="/custom-page"
            element={<MantineInferencer resource="posts" action="create" />}
          />
        </Routes>
      </Wrapper>,
    );

    const renderingEdit = render(
      <Wrapper>
        <Routes>
          <Route
            path="/custom-page"
            element={
              <MantineInferencer resource="posts" action="edit" id="11" />
            }
          />
        </Routes>
      </Wrapper>,
    );

    const renderingShow = render(
      <Wrapper>
        <Routes>
          <Route
            path="/custom-page"
            element={
              <MantineInferencer resource="posts" action="show" id="21" />
            }
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

    const nodeList = renderingList.asFragment();
    const nodeCreate = renderingCreate.asFragment();
    const nodeEdit = renderingEdit.asFragment();
    const nodeShow = renderingShow.asFragment();

    expect(nodeList).toMatchSnapshot();
    expect(nodeCreate).toMatchSnapshot();
    expect(nodeEdit).toMatchSnapshot();
    expect(nodeShow).toMatchSnapshot();
  });
});
