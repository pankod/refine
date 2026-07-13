---
id: contributing
title: Contributing
---

We follow a [code of conduct][code_of_conduct] when participating in the community. Please read it before you make any contributions.

-   If you plan to work on an issue, mention so in the issue page before you start working on it.
-   If you plan to work on a new feature, create an issue and discuss it with other community members/maintainers.
-   Ask for help in our [community room][discord channel].
## Ways to contribute

- **Stars on GitHub**: If you're a refine user and enjoy using our platform, don't forget to star it on [GitHub](https://github.com/refinedev/refine)! 🌟
- **Improve documentation**: Good documentation is imperative to the success of any project. You can make our documents the best they need to be by improving their quality or adding new ones.
- **Give feedback**: We're always looking for ways to make refine better, please share how you use refine, what features are missing and what is done good via [GitHub Discussions](https://github.com/refinedev/refine/discussions) or [Discord](http://discord.gg/refine).
- **Share refine**: Help us reach people. Share [refine repository](https://github.com/refinedev/refine) with everyone who can be interested.
- **Contribute to codebase**: your help is needed to make this project the best it can be! You could develop new features or fix [existing issues](https://github.com/refinedev/refine/issues) - every contribution will be welcomed with great pleasure!


## Commit convention

refine is a monorepo. For a monorepo, commit messages are essential to keep everything clear. We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to keep our commit messages consistent and easy to understand.

```
<type>(optional scope): <description>
```
Examples:
- `feat: allow provided config object to extend other configs`
- `fix: array parsing issue when multiple spaces were contained in string`
- `docs: correct spelling of CHANGELOG`

## Git branches
- `next` – contains next version (1.x.0), most likely you would want to create a PR to this branch
- `master` – current stable version

## Changeset
[Changesets](https://github.com/changesets/changesets) are designed to make your workflows easier, by allowing the person making contributions to make key decisions when they are making their contribution. Changesets hold two key bits of information: a version type (following semver), and change information to be added to a changelog.

Follow the steps below to create a changeset:

```sh
npm run changeset
```

After that you need to,

- select the package(s) you are modifying
- choose one of `major/patch/minor` according to your change
- some explanation about the changes

and then you are done!
## Running in development mode

`node` version 16 is required.

This project has multiple packages and uses [Lerna][lerna] to manage packages under `packages/`.

First, install dependencies:

```sh
npm install
```

From now on, depending on the packages you plan to work on, (they are located under `packages/` and `examples/` directories - see [lerna.json][lerna.json]) you will need to bootstrap them and start them in watch mode. Instead of running `lerna bootstrap` directly, read on to see how **refine** team handles it.

[Refer to **lerna** docs to learn more about it. &#8594][lerna]

[Refer to **lerna** docs to learn more about `lerna bootstrap`. &#8594][lerna bootstrap]

### Starting the packages you work in watch mode

You can either bootstrap all packages or only the packages you plan to work on.

To bootstrap all packages (all packages under `/examples` and under `/packages` whose names start with `@pankod/refine*`), you should run:

```bash
npm run bootstrap
```

To bootstrap the specific packages/examples only (all packages under `/packages` whose names start with `@pankod/refine*` and specified packages):

```bash
npm run bootstrap -- --scope refine-use-select-example
```

[Refer to **lerna** docs to learn more about `scope` flag. &#8594][lerna filter]

`npm run bootstrap` command bootstraps all packages whose name start with `@pankod/refine*` and all packages under `/examples`. If you add filters with `--scope` flag, you can avoid bootstrapping all packages under `/examples`.

At this point, all/required packages are bootstrapped. Now you can start the packages you plan to work on in development mode. If you don't want to start all packages in development mode, you should filter them:

```bash
npm run build
npm run start -- --scope @pankod/refine-core --scope @pankod/refine-antd --scope refine-use-select-example
```

This command starts the example named `refine-use-select-example` in dev mode. The value of the flag `--scope` is the name that is defined in it's `package.json` file. Note that `--scope` flag should be used for every package that should be filtered. If you should start two packages:

Now all filtered packages are running in watch mode. They should re-compile when you make a change in any of them.

### Starting documentation in watch mode

Our documentation is built with [Docusaurus][docusaurus]. To start it in development mode, run:

```bash
cd documentation
npm install
DISABLE_DOCGEN=true npm run start
```

:::tip
`DISABLE_DOCGEN` is set to `true` to skip generate type documentation for the packages. If you want to generate documentation for the packages, you can set it to `false`.
:::

:::note Docgen plugin and Props Table
If you are working on type generation and props tables for specific packages, you can use `INCLUDED_PACKAGES` environment variable to run the scripts for only the packages you are working on by providing comma delimited list of package directories.

For example, if you are working on `@pankod/refine-antd` and `@pankod/refine-core` packages, which are located under `packages/antd` and `packages/core` directories, you can run the following command to generate type documentation for only these packages:

```bash
INCLUDED_PACKAGES=antd,core npm run start
```

To use `<PropsTable />` component, you should pass `module` prop as `string` to the component in form of `@pankod/refine-antd/MyComponent`.

```jsx
<PropsTable module="@pankod/refine-antd/Create" />
```

:::

## Running tests

`npm run test` command runs tests for all packages. If you're working on a package (e.g. `/packages/core`), you can run tests only for that package:

```bash
cd packages/core
npm run test
```

Or you can do it for a specific file:

```bash
npm run test -- /src/hooks/export/index.spec.ts
```

Also, to run a specific file's tests in watch mode:

```bash
npm run test -- --watch /src/hooks/export/index.spec.ts
```

Get coverage report for that file:

```bash
npm run test -- --coverage /src/hooks/export/index.spec.ts
```

When you run the command that produces coverage report, go to `/coverage/lcov-report/index.html` file to see coverage results. If you run this command in `/packages/core` directory, then coverage report will be generated in `/packages/core/coverage`.

Please make sure you contribute well tested code.

## Creating Live Previews in Documentation

We're using live previews powered with [`react-live`](https://github.com/FormidableLabs/react-live) to demonstrate our components and logic with `refine` running at full functionality. To create a live preview, you should add `live` property to your code blocks in markdown files.

:::tip
You can use `import` statements to show them in the code block but they will be ignored when running the code. Instead all import statements related to **refine** will be converted into object destructures and prepended into code. This will allow you to do the import in the visible part of the code and also use them before the import statements. Check out [Defined Scope](#defined-scope) section to learn more about the available packages and variables.
:::

:::info
Refine Live Previews has an independent package apart from the documentation and the previews are rendered through this package via iframe. `@pankod/refine-live-previews` runs on `3030` port by default and the fallback value for `LIVE_PREVIEW_URL` is set to `http://localhost:3030` for development purposes. If you want to run both the previews package and the documentation at the same time, use `npm run start:doc` command.
:::

### Properties

You can use the following properties to adjust your live blocks:

| Property        | Description                                  | Default                 |
| --------------- | -------------------------------------------- | ----------------------- |
| `hideCode`      | Adds title                                   | false                   |
| `disableScroll` | Disables the scroll in the preview           | false                   |
| `previewHeight` | Height of the preview                        | `400px`                 |
| `url`           | URL to be shown in the header of the preview | `http://localhost:3000` |

### Hiding Boilerplate Code

There are two ways to hide/show code sections in your live code blocks; either you can wrap your visible code to `// visible-block-start` and `// visible-block-end` comments, or you can use `// hide-next-line`, `// hide-start` and `// hide-end` comments. You can use both of them in the same code block.

**`// visible-block-start` and `// visible-block-end`**

This wrapper can be used to show only the desired part of the code in the code block and will not affect the live preview. Copy code button will only copy the code inside this block. This is the recommended way to hide boilerplate/unwanted code.

** `// hide-next-line` and `// hide-start` and `// hide-end`**

These magic comments will hide the next line or the wrapped code block. You can use these to hide the code that you want to show in the code blocks. These will also not affect the live preview but those lines will be copied with the copy button. Use these to hide the required code pieces for the live preview but are out of scope for the example. Such as while showing how a property of a component works in live preview, you can hide the required but not relevant props.

### Rendering the Preview

To render the live preview you should call the `render` function with your component. `render` function is specific to `react-live` and it will render the preview in the browser; therefore not needed to be visible in the codeblock, it's recommended to leave the `render` part outside of the `// visible-block` wrapper.

**Example Usage**

````ts
```tsx live hideCode url=http://localhost:3000/posts/create
// You can use object destructuring to import the necessary functions and components which you don't want to show in the code block.
// highlight-start
const { CreateButton } = RefineAntd;
// highlight-end

interface ICategory {
id: number;
title: string;
}

interface IPost {
id: number;
title: string;
content: string;
status: "published" | "draft" | "rejected";
category: { id: number };
}

// visible-block-start
// Import statements will be replaced with the object destructuring but visible code block will not be affected.
// highlight-start
import {
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";
// highlight-end

const PostCreate: React.FC = () => {
const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );

};
// visible-block-end

// This part is required to render the preview.
// highlight-start
render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
// highlight-end
```;
````

** Result **

```tsx live hideCode disableScroll url=http://localhost:3000/posts/create
// You can use object destructuring to import the necessary functions and components which you don't want to show in the code block.
// highlight-start
const { CreateButton } = RefineAntd;
// highlight-end

interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

// visible-block-start
// Import statements will be replaced with the object destructuring but visible code block will not be affected.
// highlight-start
import {
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";
// highlight-end

const PostCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};
// visible-block-end

// This part is required to render the preview.
// highlight-start
render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
// highlight-end
```

### Defined Scope

| Variable              | Description                                                                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `React`               | React 17                                                                                                                                                                                                                                                    |
| `RefineCore`          | `@pankod/refine-core`                                                                                                                                                                                                                                       |
| `RefineSimpleRest`    | `@pankod/refine-simple-rest`                                                                                                                                                                                                                                |
| `RefineAntd`          | `@pankod/refine-antd`                                                                                                                                                                                                                                       |
| `RefineMui`           | `@pankod/refine-mui`                                                                                                                                                                                                                                        |
| `RefineMantine`       | `@pankod/refine-mantine`                                                                                                                                                                                                                                        |
| `RefineReactRouterV6` | `@pankod/refine-react-router-v6`                                                                                                                                                                                                                            |
| `RefineReactHookForm` | `@pankod/refine-react-hook-form`                                                                                                                                                                                                                            |
| `RefineReactTable`    | `@pankod/refine-react-table`                                                                                                                                                                                                                                |
| `RefineHeadlessDemo`  | Predefined `<Refine/>` component with simple-rest and react-router-v6 props for easier use                                                                                                                                                                  |
| `RefineMuiDemo`       | Predefined `<Refine/>` component with Material UI, simple-rest and react-router-v6 props for easier use                                                                                                                                                     |
| `RefineAntdDemo`      | Predefined `<Refine/>` component with Ant Design, simple-rest and react-router-v6 props for easier use                                                                                                                                                      |
| `setInitialRoutes`    | For live previews, we use `MemoryRouter` from `react-router-v6` and to set the initial entries of the history, you can use this function.                                                                                                                   |
| `setRefineProps`      | For live previews, you may need to set some props to `<Refine />` component that are unrelated to the code block you're writing. In those cases, you can use `setRefinProps` outside of the visible code block to set props or override the existing props. |

:::tip
Demo components are recommended to be used whenever possible to avoid unnecessary configuration at every code block. They are equipped with the `refine-react-router-v6` setup with `MemoryRouter`, `refine-simple-rest` data provider and the preferred UI Integration.
:::

:::info
`Refine` component from `RefineCore` has the default prop `reactQueryDevtoolConfig` set to `false` to disable the React Query Dev Tools since it doesn't work with the production version of the React.
:::

:::info
`setInitialRoutes` is a function to set the initial routes of the preview for `@pankod/refine-react-router-v6` using `MemoryRouter`. This function takes one argument `initialRoutes` which is an array of routes to be rendered initially. For example, if your component is rendered at `/posts/create`, you can pass `["/posts/create"]` as the argument.
:::

:::tip
Make sure you use `setInitialRoutes` function before rendering the `<Refine/>` component. Otherwise, `MemoryRouter` will not be able to set the initial routes. For some cases, you might find setting `initialRoutes` prop of demo `<Refine/>` (`RefineHeadlessDemo`, `RefineMuiDemo` and `RefineAntdDemo`) components easier. There's no difference between the two approaches.
:::

:::tip
`setRefineProps` is a function to set additional props to `<Refine />` or override existing props of `<Refine />`. Make sure you don't conflict with the props you set in the visible block while overriding; which may cause unwanted results.
:::

[lerna]: https://github.com/lerna/lerna
[lerna bootstrap]: https://lerna.js.org/#command-bootstrap
[lerna filter]: https://lerna.js.org/docs/api-reference/commands#--scope-glob
[package.json]: https://github.com/refinedev/refine/blob/v3/package.json
[docusaurus]: https://docusaurus.io/
[issues]: https://github.com/refinedev/refine/issues
[code_of_conduct]: https://github.com/refinedev/refine/blob/v3/CODE_OF_CONDUCT.md
[discord channel]: https://discord.gg/refine
[lerna.json]: https://github.com/refinedev/refine/blob/v3/lerna.json
