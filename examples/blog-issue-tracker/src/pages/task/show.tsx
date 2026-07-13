import { useShow, useOne } from "@refinedev/core";
import { Show, DateField } from "@refinedev/antd";
import { Typography, Tag } from "antd";
import type { ITask, ILabel, IPriority, IStatus, IAuthUser } from "../../types";

const { Title, Text } = Typography;

export const TaskShow: React.FC = () => {
  const { query: queryResult } = useShow<ITask>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { result: assigned } = useOne<IAuthUser>({
    resource: "users",
    id: record?.user_id ?? "",
    queryOptions: { enabled: !!record?.user_id },
  });

  const { result: label } = useOne<ILabel>({
    resource: "label",
    id: record?.label_id ?? "",
    queryOptions: { enabled: !!record?.label_id },
  });

  const { result: priority } = useOne<IPriority>({
    resource: "priority",
    id: record?.priority_id ?? "",
    queryOptions: { enabled: !!record?.priority_id },
  });

  const { result: status } = useOne<IStatus>({
    resource: "status",
    id: record?.status_id ?? "",
    queryOptions: { enabled: !!record?.status_id },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Task:</Title>
      <Text>{record?.title || "-"}</Text>
      <Title level={5}>Task Description:</Title>
      <Text>{record?.description}</Text>
      <Title level={5}>Assigned To:</Title>
      <Text>
        <Tag>{assigned?.email ?? "-"}</Tag>
      </Text>
      <Title level={5}>Label:</Title>
      <Text>
        <Tag>{label?.title ?? "-"}</Tag>
      </Text>
      <Title level={5}>Priority:</Title>
      <Text>{priority?.title ?? "-"}</Text>
      <Title level={5}>Status:</Title>
      <Text>{status?.title ?? "-"}</Text>
      <Title level={5}>Start Date:</Title>
      <DateField format="DD/MM/YYYY" value={record?.start_time ?? "-"} />
      <Title level={5}>Due Date:</Title>
      <DateField format="DD/MM/YYYY" value={record?.end_time ?? "-"} />
    </Show>
  );
};
