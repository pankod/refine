import React from "react";
import { List, useTable, useModalForm, DeleteButton, EditButton } from "@refinedev/antd";
import { Typography, Table, Space, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toList } from "../../providers/listResponse";

const { Title, Text } = Typography;

export const DashboardList: React.FC = () => {
  const { tableProps } = useTable({
    resource: "dashboards",
    dataProviderName: "dashboards",
  });

  const { modalProps: createModalProps, formProps: createFormProps, show: showCreate } = useModalForm({
    resource: "dashboards",
    action: "create",
    dataProviderName: "dashboards",
  });

  const { modalProps: editModalProps, formProps: editFormProps, show: showEdit } = useModalForm({
    action: "edit",
    dataProviderName: "dashboards",
    syncWithLocation: false,
  });

  return (
    <>
      <List 
        title="Danh sách Bảng điều khiển"
        headerButtons={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showCreate()}>
            Tạo Bảng điều khiển
          </Button>
        }
      >
        <Table {...tableProps} dataSource={toList(tableProps.dataSource)} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Tên Bảng điều khiển" render={(value) => <strong>{value}</strong>} />
          <Table.Column dataIndex="description" title="Mô tả" />
          <Table.Column dataIndex="createdAt" title="Ngày tạo" render={(value: string) => value ? new Date(value).toLocaleString() : ""} />
          <Table.Column 
            title="Hành động" 
            dataIndex="actions" 
            render={(_, record: any) => (
              <Space>
                <EditButton hideText size="small" onClick={() => showEdit(record.id)} />
                <DeleteButton hideText size="small" recordItemId={record.id} dataProviderName="dashboards" />
              </Space>
            )} 
          />
        </Table>
      </List>

      <Modal {...createModalProps} title="Tạo Bảng điều khiển mới" width={500}>
        <Form {...createFormProps} layout="vertical">
          <Form.Item 
            label="Tên Bảng điều khiển" 
            name="title" 
            rules={[{ required: true, message: "Vui lòng nhập tên Bảng điều khiển!" }]}
          >
            <Input placeholder="Ví dụ: Dashboard Tổng quan" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả công dụng của Dashboard này..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal {...editModalProps} title="Sửa Bảng điều khiển" width={500} forceRender>
        <Form {...editFormProps} layout="vertical">
          <Form.Item 
            label="Tên Bảng điều khiển" 
            name="title" 
            rules={[{ required: true, message: "Vui lòng nhập tên Bảng điều khiển!" }]}
          >
            <Input placeholder="Ví dụ: Dashboard Tổng quan" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả công dụng của Dashboard này..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
