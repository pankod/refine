import React from "react";
import { useMany, type HttpError, type CrudFilters } from "@refinedev/core";

import {
  useSelect,
  useTable,
  List,
  TextField,
  TagField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";

import { SearchOutlined } from "@ant-design/icons";
import { Table, Space, Row, Col, Card } from "antd";
import { Form, type FormProps, Input, Select, DatePicker, Button } from "antd";

import type {
  ILabel,
  IPriority,
  ITask,
  ITaskFilterVariables,
  IStatus,
  IAuthUser,
} from "../../types";

export const TaskList = () => {
  const { tableProps, result, searchFormProps } = useTable<
    ITask,
    HttpError,
    ITaskFilterVariables
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const {
        title,
        label_id,
        priority_id,
        user_id,
        status_id,
        start_time,
        end_time,
      } = params;

      filters.push(
        {
          field: "title",
          operator: "eq",
          value: title,
        },

        {
          field: "label_id",
          operator: "eq",
          value: label_id,
        },

        {
          field: "priority_id",
          operator: "eq",
          value: priority_id,
        },

        {
          field: "user_id",
          operator: "eq",
          value: user_id,
        },

        {
          field: "status_id",
          operator: "eq",
          value: status_id,
        },

        {
          field: "start_time",
          operator: "gte",
          value: start_time ? start_time[0].toISOString() : undefined,
        },

        {
          field: "start_time",
          operator: "lte",
          value: start_time ? start_time[1].toISOString() : undefined,
        },

        {
          field: "end_time",
          operator: "gte",
          value: end_time ? end_time[0].toISOString() : undefined,
        },

        {
          field: "end_time",
          operator: "lte",
          value: end_time ? end_time[1].toISOString() : undefined,
        },
      );
      return filters;
    },
  });

  const labelIds =
    result?.data?.map((item) => item.label_id).filter(Boolean) ?? [];
  const priorityIds =
    result?.data?.map((item) => item.priority_id).filter(Boolean) ?? [];
  const assignedIds =
    result?.data?.map((item) => item.user_id).filter(Boolean) ?? [];
  const statusIds =
    result?.data?.map((item) => item.status_id).filter(Boolean) ?? [];

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

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="Task Filter">
          <Filter formProps={searchFormProps} />
        </Card>
      </Col>
      <Col lg={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="title" title="Title" />
            <Table.Column
              dataIndex="label_id"
              title="Label"
              render={(value) => {
                return (
                  <TagField
                    color={
                      labels?.data.find((item) => item.id === value)?.color
                    }
                    value={
                      labels?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="priority_id"
              title="Priority"
              render={(value) => {
                return (
                  <TextField
                    value={
                      priority?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="user_id"
              title="Assigned"
              render={(value) => {
                return (
                  <TagField
                    value={
                      assigned?.data.find((item) => item.id === value)?.email
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="status_id"
              title="Status"
              render={(value) => {
                return (
                  <TextField
                    value={
                      status?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="start_time"
              title="Start Date"
              render={(value) => (
                <DateField format="DD/MM/YYYY" value={value} />
              )}
            />
            <Table.Column
              dataIndex="end_time"
              title="Due Date"
              render={(value) => (
                <DateField format="DD/MM/YYYY" value={value} />
              )}
            />
            <Table.Column<ITask>
              title="Actions"
              dataIndex="actions"
              render={(_, record): React.ReactNode => {
                return (
                  <Space>
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                  </Space>
                );
              }}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};

const { RangePicker } = DatePicker;

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { selectProps: labelSelectProps } = useSelect<ILabel>({
    resource: "label",
  });

  const { selectProps: priorityProps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: statusProps } = useSelect<IStatus>({
    resource: "status",
  });

  const { selectProps: assigneeProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: () => "id",
    optionLabel: () => "email",
  });

  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="Search" name="title">
        <Input placeholder="Title" prefix={<SearchOutlined />} />
      </Form.Item>
      <Form.Item label="Label" name="label_id">
        <Select {...labelSelectProps} allowClear placeholder="Search Label" />
      </Form.Item>
      <Form.Item label="Priority" name="priority_id">
        <Select {...priorityProps} allowClear placeholder="Search Priority" />
      </Form.Item>
      <Form.Item label="Status" name="status_id">
        <Select {...statusProps} allowClear placeholder="Search Status" />
      </Form.Item>
      <Form.Item label="Assigned" name="user_id">
        <Select {...assigneeProps} allowClear placeholder="Search Assignee" />
      </Form.Item>
      <Form.Item label="Start Date" name="start_time">
        <RangePicker />
      </Form.Item>
      <Form.Item label="Due Date" name="end_time">
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};
