import React, { useState } from "react";
import { useShow } from "@refinedev/core";

import {
  List,
  EditButton,
  ShowButton,
  useTable,
  useModalForm,
  DeleteButton,
} from "@refinedev/antd";

import {
  Table,
  Form,
  Select,
  Input,
  Modal,
  Space,
  Typography,
  Spin,
} from "antd";

import type { IPost } from "../../interfaces";

const { Title, Text } = Typography;

export const PostList = () => {
  const { tableProps } = useTable<IPost>();

  // Create Modal
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
    formLoading: createFormLoading,
  } = useModalForm<IPost>({
    action: "create",
    syncWithLocation: true,
  });

  // Edit Modal
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
    formLoading: editFormLoading,
  } = useModalForm<IPost>({
    action: "edit",
    syncWithLocation: true,
  });

  // Show Modal
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

  const { query: queryResult, setShowId } = useShow<IPost>();

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createModalShow();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editModalShow(record.id)}
                />
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => {
                    setShowId(record.id);
                    setVisibleShowModal(true);
                  }}
                />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
      <Modal {...createModalProps}>
        <Spin spinning={createFormLoading}>
          <Form {...createFormProps} layout="vertical">
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
        </Spin>
      </Modal>
      <Modal {...editModalProps}>
        <Spin spinning={editFormLoading}>
          <Form {...editFormProps} layout="vertical">
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
        </Spin>
      </Modal>
      <Modal
        visible={visibleShowModal}
        onCancel={() => setVisibleShowModal(false)}
        title="Show post"
      >
        <Title level={5}>Id</Title>
        <Text>{record?.id}</Text>

        <Title level={5}>Status</Title>
        <Text>{record?.status}</Text>

        <Title level={5}>Title</Title>
        <Text>{record?.title}</Text>
      </Modal>
    </>
  );
};
