import { removeUseNewQueryKeysFromRefineOptions } from "./remove-useNewQueryKeys-from-refine-options";

import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  removeUseNewQueryKeysFromRefineOptions(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("remove-useNewQueryKeys-from-refine-options", () => {
  it("should remove useNewQueryKeys from options with single property", () => {
    const source = `
      <Refine 
        options={{
          useNewQueryKeys: true
        }}
      />
    `;

    const expected = `
      <Refine 
        options={{}}
      />
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should remove useNewQueryKeys from options with multiple properties", () => {
    const source = `
      <Refine 
        dataProvider={dataProvider}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
        }}
      />
    `;

    const expected = `
      <Refine 
        dataProvider={dataProvider}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      />
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should remove useNewQueryKeys from options preserving other props", () => {
    const source = `
      <Refine 
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
        options={{
          syncWithLocation: true,
          useNewQueryKeys: true,
          warnWhenUnsavedChanges: true,
        }}
        resources={resources}
      />
    `;

    const expected = `
      <Refine 
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
        resources={resources}
      />
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle Refine without options prop", () => {
    const source = `
      <Refine 
        dataProvider={dataProvider}
      />
    `;

    const expected = `
      <Refine 
        dataProvider={dataProvider}
      />
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle options without useNewQueryKeys property", () => {
    const source = `
      <Refine 
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      />
    `;

    const expected = `
      <Refine 
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      />
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle real-world example", () => {
    const source = `
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProviderClient}
        i18nProvider={i18nProvider}
        resources={[
          {
            name: "blog_posts",
            list: "/blog-posts",
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
        }}
      >
        {children}
      </Refine>
    `;

    const expected = `
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProviderClient}
        i18nProvider={i18nProvider}
        resources={[
          {
            name: "blog_posts",
            list: "/blog-posts",
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        {children}
      </Refine>
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle useNewQueryKeys as false", () => {
    const source = `
      <Refine 
        options={{
          syncWithLocation: true,
          useNewQueryKeys: false,
        }}
      />
    `;

    const expected = `
      <Refine 
        options={{
          syncWithLocation: true,
        }}
      />
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
