import { prepareLiveCode } from ".";

describe("prepareLiveCode", () => {
  it("should add componentName check at render function after code", () => {
    const code = "const MyComponent = () => null;";
    const componentName = "MyComponent";

    expect(prepareLiveCode(code, componentName)).toContain(
      'render(typeof MyComponent !== "undefined" ? <MyComponent /> : <></>)',
    );
  });
});
