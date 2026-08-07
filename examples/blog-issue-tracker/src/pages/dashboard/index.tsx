import React from "react";
import { useList, useMany } from "@refinedev/core";
import { Row, Col, Card } from "antd";
import type { ITask, ILabel, IPriority, IStatus, IAuthUser } from "../../types";
import { TaskChart } from "../../components";
import { groupBy } from "../../helper";

export const Dashboard = () => {
  const { result: taskList } = useList<ITask>({
    resource: "tasks",
  });

  const labelIds =
    taskList?.data?.map((item) => item.label_id).filter(Boolean) ?? [];
  const priorityIds =
    taskList?.data?.map((item) => item.priority_id).filter(Boolean) ?? [];
  const assignedIds =
    taskList?.data?.map((item) => item.user_id).filter(Boolean) ?? [];
  const statusIds =
    taskList?.data?.map((item) => item.status_id).filter(Boolean) ?? [];

  const { result: labels } = useMany<ILabel>({
    resource: "label",
    ids: labelIds,
    queryOptions: { enabled: !!labelIds.length },
  });

  const { result: priority } = useMany<IPriority>({
    resource: "priority",
    ids: priorityIds,
    queryOptions: { enabled: !!priorityIds.length },
  });

  const { result: assigned } = useMany<IAuthUser>({
    resource: "users",
    ids: assignedIds,
    queryOptions: { enabled: !!assignedIds.length },
  });

  const { result: status } = useMany<IStatus>({
    resource: "status",
    ids: statusIds,
    queryOptions: { enabled: !!statusIds.length },
  });

  const chartSections = [
    {
      key: "labels",
      title: "Tasks by Label",
      data:
        labels?.data.map((item) => ({
          type: item.title,
          value: groupBy(labelIds)[item.id] ?? 0,
        })) ?? [],
    },
    {
      key: "priority",
      title: "Tasks by Priority",
      data:
        priority?.data.map((item) => ({
          type: item.title,
          value: groupBy(priorityIds)[item.id] ?? 0,
        })) ?? [],
    },
    {
      key: "status",
      title: "Tasks by Status",
      data:
        status?.data.map((item) => ({
          type: item.title,
          value: groupBy(statusIds)[item.id] ?? 0,
        })) ?? [],
    },
    {
      key: "assignee",
      title: "Tasks by Assignee",
      data:
        assigned?.data.map((item) => ({
          type: item.email,
          value: groupBy(assignedIds)[item.id] ?? 0,
        })) ?? [],
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {chartSections.map((section) => (
        <Col key={section.key} xxl={6} xl={12} md={12} sm={24} xs={24}>
          <Card
            title={section.title}
            headStyle={{ padding: "12px 16px" }}
            bodyStyle={{ padding: "16px 16px 8px" }}
          >
            <TaskChart data={section.data} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
