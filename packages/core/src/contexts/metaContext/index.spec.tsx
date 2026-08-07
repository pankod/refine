import React from "react";
import { render, screen } from "@testing-library/react";
import { MetaContextProvider, useMetaContext } from "./index";
import "@testing-library/jest-dom/vitest";

describe("MetaContextProvider", () => {
  it("provides the correct meta context value to child components", () => {
    const TestComponent = () => {
      const meta = useMetaContext();
      return <div>{meta.testKey}</div>;
    };

    render(
      <MetaContextProvider value={{ testKey: "testValue" }}>
        <TestComponent />
      </MetaContextProvider>,
    );

    expect(screen.getByText("testValue")).toBeInTheDocument();
  });

  it("merges existing context value with new value", () => {
    const TestComponent = () => {
      const meta = useMetaContext();
      return (
        <>
          <div>{meta.firstKey}</div>
          <div>{meta.secondKey}</div>
        </>
      );
    };

    render(
      <MetaContextProvider value={{ firstKey: "value1" }}>
        <MetaContextProvider value={{ secondKey: "value2" }}>
          <TestComponent />
        </MetaContextProvider>
      </MetaContextProvider>,
    );

    expect(screen.getByText("value1")).toBeInTheDocument();
    expect(screen.getByText("value2")).toBeInTheDocument();
  });
});
