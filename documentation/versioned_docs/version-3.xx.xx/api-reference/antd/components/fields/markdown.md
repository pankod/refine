---
id: markdown
title: Markdown
swizzle: true
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live
import { useShow, IResourceComponentsProps } from "@pankod/refine-core";
import {
  Show,
  Typography,
  // highlight-next-line
  MarkdownField,
} from "@pankod/refine-antd";

const { Title, Text } = Typography;

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Content</Title>

      {/* highlight-next-line */}
      <MarkdownField value={record?.content} />
    </Show>
  );
};

interface IPost {
  id: number;
  title: string;
  content: string;
}
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <RefineAntd.List>
            <p>List page here...</p>
          </RefineAntd.List>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/MarkdownField" value-description="Markdown data to render"/>

## Example

<CodeSandboxExample path="input-custom" />
