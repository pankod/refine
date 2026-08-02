import React, { useState } from "react";
import {
  List,
  useTable,
  CreateButton,
  DeleteButton,
  EditButton,
} from "@refinedev/antd";
import { Table, Select, Modal, Form, Input, Space, Button } from "antd";
import { useSelect, useCreate, useDelete } from "@refinedev/core";
import { toList } from "../../providers/listResponse";

export const DeviceRelations: React.FC<{ deviceId: string }> = ({ deviceId }) => {
  const [direction, setDirection] = useState<"from" | "to">("from");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate: createRelation } = useCreate();

  const [form] = Form.useForm();

  // Load relations based on direction
  const { tableProps, tableQuery } = useTable({
    resource: "relations",
    filters: {
      permanent: [
        {
          field: direction === "from" ? "from_id" : "to_id",
          operator: "eq",
          value: deviceId,
        },
      ],
    },
    syncWithLocation: false, // Prevent URL mess when in a Drawer tab
  });

  // For the Add Modal
  const [selectedTargetType, setSelectedTargetType] = useState("DEVICE");
  const targetSelect = useSelect({
    resource: selectedTargetType === "DEVICE" ? "devices" : "dashboards",
    optionLabel: selectedTargetType === "DEVICE" ? "name" : "title",
    optionValue: "id",
  });

  const handleAdd = () => {
    form.validateFields().then((values) => {
      createRelation(
        {
          resource: "relations",
          values: {
            from_id: direction === "from" ? deviceId : values.target_id,
            from_type: direction === "from" ? "DEVICE" : values.target_type,
            to_id: direction === "from" ? values.target_id : deviceId,
            to_type: direction === "from" ? values.target_type : "DEVICE",
            relation_type: values.relation_type,
          },
        },
        {
          onSuccess: () => {
            setIsModalVisible(false);
            form.resetFields();
            tableQuery.refetch();
          },
        }
      );
    });
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>Direction:</span>
        <Select
          value={direction}
          onChange={(val) => setDirection(val)}
          style={{ width: 120 }}
          options={[
            { label: "From", value: "from" },
            { label: "To", value: "to" },
          ]}
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          + Thêm
        </Button>
      </Space>

      <Table
        {...tableProps}
        dataSource={toList(tableProps.dataSource)}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "No relations found" }}
      >
        <Table.Column dataIndex="relation_type" title="Type" />
        <Table.Column
          title={direction === "from" ? "To entity type" : "From entity type"}
          dataIndex={direction === "from" ? "to_type" : "from_type"}
        />
        <Table.Column
          title={direction === "from" ? "To entity name" : "From entity name"}
          dataIndex={direction === "from" ? "to_entity_name" : "from_entity_name"}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="relations"
                onSuccess={() => tableQuery.refetch()}
              />
            </Space>
          )}
        />
      </Table>

      <Modal
        title={`Add ${direction === "from" ? "Outbound" : "Inbound"} Relation`}
        open={isModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="relation_type"
            label="Type (e.g. Contains, Created)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="target_type"
            label="Entity Type"
            initialValue="DEVICE"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(val) => setSelectedTargetType(val)}
              options={[
                { label: "Device", value: "DEVICE" },
                { label: "Dashboard", value: "DASHBOARD" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="target_id"
            label="Entity Name"
            rules={[{ required: true }]}
          >
            <Select
              options={targetSelect.options}
              onSearch={targetSelect.onSearch}
              loading={targetSelect.query.isLoading}
              showSearch
              filterOption={false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
