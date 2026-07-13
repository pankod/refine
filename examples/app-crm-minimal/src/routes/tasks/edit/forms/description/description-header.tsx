import { MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

import type { Task } from "@/graphql/schema.types";

type Props = {
  description?: Task["description"];
};

export const DescriptionHeader = ({ description }: Props) => {
  if (description) {
    return (
      <Typography.Paragraph ellipsis={{ rows: 8 }}>
        <MarkdownField value={description} />
      </Typography.Paragraph>
    );
  }

  return <Typography.Link>Add task description</Typography.Link>;
};
