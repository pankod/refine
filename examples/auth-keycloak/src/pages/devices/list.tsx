import React, { useState } from "react";
import { List, useTable, useModalForm, DeleteButton, EditButton } from "@refinedev/antd";
import { Table, Tag, Drawer, Tabs, Descriptions, Typography, Card, Button, Input, Space, Form, Select, Checkbox, Modal, Row, Col, message } from "antd";
import { SearchOutlined, SyncOutlined, SettingOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, KeyOutlined, LockOutlined } from "@ant-design/icons";
import { useCustom } from "@refinedev/core";

import { useMqtt } from "../../hooks/useMqtt";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const { Text, Title } = Typography;

/**
 * ============================================================================
 * COMPONENT: DANH SÁCH THIẾT BỊ (DeviceList)
 * ============================================================================
 * Trang này chịu trách nhiệm hiển thị bảng danh sách các thiết bị IoT.
 * Nó sử dụng sức mạnh của @refinedev/antd để tự động hóa việc lấy dữ liệu (useTable),
 * hiển thị phân trang, tìm kiếm, và quản lý các Form Tạo/Sửa (useModalForm).
 */
export const DeviceList: React.FC = () => {
  const { tableProps } = useTable();

  const { 
    modalProps: createModalProps, 
    formProps: createFormProps, 
    show: showCreateModal 
  } = useModalForm({
    resource: "devices",
    action: "create",
  });

  const { 
    modalProps: editModalProps, 
    formProps: editFormProps, 
    show: showEditModal 
  } = useModalForm({
    action: "edit",
    syncWithLocation: false,
  });

  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const queryClient = useQueryClient();

  // Ghi chú: Logic prefetch background đã được chuyển lên Global CacheWarmer để tối ưu 0ms load cho toàn hệ thống.


  const API_URL = import.meta.env.VITE_API_URL || "/api";

  // Handle row click & hover prefetching
  const onRowClick = (record: any) => {
    return {
      onClick: () => {
        setSelectedDevice(record);
        setDrawerVisible(true);
      },
      onMouseEnter: () => {
        // Kỹ thuật "Prefetch on Hover": Tải trước dữ liệu ngay khi người dùng vừa di chuột qua dòng
        queryClient.prefetchQuery({
          queryKey: ['telemetry', record.id],
          queryFn: async () => {
            const res = await axios.get(`${API_URL}/devices/${record.id}/telemetry`);
            return res.data;
          },
          staleTime: 5 * 60 * 1000 // Giữ cache 5 phút để tránh spam API nếu họ rê chuột liên tục
        });
      },
      style: { cursor: 'pointer' }
    };
  };

  return (
    <>
      <List 
        title="Thiết bị (Devices)" 
        headerButtons={
          <Space>
            <Input 
              placeholder="Tìm kiếm thiết bị..." 
              prefix={<SearchOutlined />} 
              style={{ width: 250 }} 
            />
            <Button icon={<SyncOutlined />} onClick={() => tableProps.onChange?.(tableProps.pagination || {} as any, {}, {}, { currentDataSource: [] } as any)}>Tải lại</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showCreateModal()}>Tạo thiết bị</Button>
          </Space>
        }
      >
        <Table {...tableProps} rowKey="id" onRow={onRowClick} hoverable>
          <Table.Column dataIndex="name" title="Tên thiết bị" render={(value) => <strong>{value}</strong>} />
          <Table.Column dataIndex="type" title="Loại (Profile)" />
          <Table.Column dataIndex="label" title="Nhãn (Label)" />
          <Table.Column 
            dataIndex="status" 
            title="Trạng thái" 
            render={(v) => (
              <Tag color={v === 'online' ? 'success' : 'default'}>
                {v === 'online' ? '🟢 ONLINE' : '⦻ OFFLINE'}
              </Tag>
            )} 
          />
          <Table.Column 
            dataIndex="created_at" 
            title="Thời gian tạo" 
            render={(value) => new Date(value).toLocaleString()} 
          />
        </Table>
      </List>

      <Drawer
        title={
          <Space>
            <SettingOutlined />
            <Text strong style={{ fontSize: 18 }}>{selectedDevice?.name}</Text>
          </Space>
        }
        width={700}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        destroyOnClose
      >
        {selectedDevice && (
          <Tabs defaultActiveKey="details">
            <Tabs.TabPane tab="Chi tiết" key="details">
              <Card size="small" title="Thông tin cơ bản" bordered={false}>
                <Descriptions column={1} labelStyle={{ fontWeight: "bold" }}>
                  <Descriptions.Item label="ID Thiết bị">{selectedDevice.id}</Descriptions.Item>
                  <Descriptions.Item label="Tên">{selectedDevice.name}</Descriptions.Item>
                  <Descriptions.Item label="Loại (Profile)">{selectedDevice.type}</Descriptions.Item>
                  <Descriptions.Item label="Nhãn (Label)">{selectedDevice.label}</Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    {selectedDevice.status === "online" ? <Text type="success">Đang hoạt động</Text> : <Text type="secondary">Mất kết nối</Text>}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Space style={{ marginTop: 16 }}>
                <EditButton 
                  resource="devices" 
                  recordItemId={selectedDevice.id} 
                  onClick={() => {
                    setDrawerVisible(false);
                    showEditModal(selectedDevice.id);
                  }}
                />
                <Button 
                  icon={<KeyOutlined />} 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedDevice.device_key || "Chưa có Device Key");
                    message.success("Đã copy Device Key!");
                  }}
                >
                  Copy Device Key
                </Button>
                <Button 
                  icon={<LockOutlined />} 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedDevice.secret || "Chưa có Secret");
                    message.success("Đã copy Secret!");
                  }}
                >
                  Copy Secret
                </Button>
                <DeleteButton 
                  resource="devices" 
                  recordItemId={selectedDevice.id} 
                  onSuccess={() => setDrawerVisible(false)}
                  confirmTitle="Bạn có chắc muốn xóa vĩnh viễn thiết bị này không?"
                  confirmOkText="Xóa"
                  confirmCancelText="Hủy"
                />
              </Space>
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Thuộc tính (Attributes)" key="attributes">
              <DeviceAttributes deviceId={selectedDevice.id} />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Đo lường (Telemetry)" key="telemetry">
              <DeviceTelemetry deviceId={selectedDevice.id} deviceKey={selectedDevice.device_key} />
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Cảnh báo (Alarms)" key="alarms">
              <div style={{ textAlign: "center", padding: 40 }}>
                <Text type="secondary">Chưa có cảnh báo nào được ghi nhận.</Text>
              </div>
            </Tabs.TabPane>
          </Tabs>
        )}
      </Drawer>

      <Modal {...createModalProps} title="Tạo thiết bị mới (Create Device)" width={600}>
        <Form {...createFormProps} layout="vertical">
          <Form.Item 
            label="Tên thiết bị (Name)" 
            name="name" 
            rules={[{ required: true, message: "Vui lòng nhập tên thiết bị!" }]}
          >
            <Input placeholder="Ví dụ: Cảm biến nhiệt độ DHT22" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại (Device Profile)" name="type" initialValue="default">
                <Select>
                  <Select.Option value="default">Mặc định (default)</Select.Option>
                  <Select.Option value="sensor">Cảm biến (sensor)</Select.Option>
                  <Select.Option value="actuator">Thiết bị chấp hành (actuator)</Select.Option>
                  <Select.Option value="gateway">Cổng kết nối (gateway)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Nhãn (Label)" name="label">
                <Input placeholder="Ví dụ: Nhà kính A" />
              </Form.Item>
            </Col>
          </Row>



          <Form.Item label="Mô tả (Description)" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả chi tiết về thiết bị..." />
          </Form.Item>

          <Form.Item name="autoGenerateToken" valuePropName="checked" initialValue={true}>
            <Checkbox>Tự động sinh mã Access Token xác thực (Mặc định)</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <Modal {...editModalProps} title="Sửa thông tin thiết bị" width={600} forceRender>
        <Form {...editFormProps} layout="vertical">
          <Form.Item 
            label="Tên thiết bị (Name)" 
            name="name" 
            rules={[{ required: true, message: "Vui lòng nhập tên thiết bị!" }]}
          >
            <Input placeholder="Ví dụ: Cảm biến nhiệt độ DHT22" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại (Device Profile)" name="type" initialValue="default">
                <Select>
                  <Select.Option value="default">Mặc định (default)</Select.Option>
                  <Select.Option value="sensor">Cảm biến (sensor)</Select.Option>
                  <Select.Option value="actuator">Thiết bị chấp hành (actuator)</Select.Option>
                  <Select.Option value="gateway">Cổng kết nối (gateway)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Nhãn (Label)" name="label">
                <Input placeholder="Ví dụ: Nhà kính A" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Trạng thái" name="status">
                <Select>
                  <Select.Option value="offline">Ngoại tuyến (Offline)</Select.Option>
                  <Select.Option value="online">Trực tuyến (Online)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả (Description)" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả chi tiết về thiết bị..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

/**
 * ============================================================================
 * COMPONENT CON: HIỂN THỊ THUỘC TÍNH (DeviceAttributes)
 * ============================================================================
 * Nhiệm vụ: Lấy cấu hình (Attributes) của thiết bị (Shared, Client, Server scope)
 * Dùng hook `useCustom` của Refine để gọi thẳng API tùy chỉnh.
 */
const DeviceAttributes: React.FC<{ deviceId: string }> = ({ deviceId }) => {
  const { data, isLoading } = useCustom<any>({
    url: `devices/${deviceId}/attributes`,
    method: "get",
    dataProviderName: "devices",
    meta: {
      dataProviderName: "devices"
    }
  });

  const attributes = data?.data || { client: [], shared: [], server: [] };
  
  // Gop tat ca attributes de hien thi trong 1 bang
  const allAttrs = [
    ...attributes.client.map((a: any) => ({ ...a, scope: "Client" })),
    ...attributes.shared.map((a: any) => ({ ...a, scope: "Shared" })),
    ...attributes.server.map((a: any) => ({ ...a, scope: "Server" }))
  ];

  return (
    <Table 
      dataSource={allAttrs} 
      rowKey={(record) => record.scope + record.key} 
      loading={isLoading}
      size="small"
      pagination={{ pageSize: 10 }}
    >
      <Table.Column dataIndex="lastUpdate" title="Cập nhật lần cuối" render={(v) => new Date(v).toLocaleString()} />
      <Table.Column dataIndex="key" title="Thuộc tính (Key)" render={(v) => <strong>{v}</strong>} />
      <Table.Column dataIndex="value" title="Giá trị (Value)" />
      <Table.Column dataIndex="scope" title="Phạm vi (Scope)" render={(v) => <Tag color="blue">{v}</Tag>} />
    </Table>
  );
};

/**
 * ============================================================================
 * COMPONENT CON: HIỂN THỊ DỮ LIỆU ĐO LƯỜNG THỜI GIAN THỰC (DeviceTelemetry)
 * ============================================================================
 * Nhiệm vụ:
 * 1. Lần đầu mở lên: Dùng `useQuery` (React Query) để lấy dữ liệu cuối cùng từ Backend (DB).
 * 2. Ngay sau đó: Dùng `useMqtt` kết nối thẳng WebSocket tới máy chủ EMQX Broker.
 * 3. Bất cứ khi nào thiết bị (ESP32) bắn số mới lên EMQX, Component này sẽ nhận được lập tức,
 *    và tự động chèn (patch) vào Cache của React Query để Giao diện chớp số mới mà không cần Reload API.
 */
const DeviceTelemetry: React.FC<{ deviceId: string, deviceKey: string }> = ({ deviceId, deviceKey }) => {
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL || "/api";

  // Fetch Telemetry (Current Data) with SWR Caching
  const { data: telemetryData = [], isLoading: isLoadingTelemetry } = useQuery({
    queryKey: ['telemetry', deviceId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/devices/${deviceId}/telemetry`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes cache
  });



  // Tích hợp MQTT hook
  const { payload, isConnected } = useMqtt({
    topic: `v1/devices/${deviceKey}/telemetry`,
  });

  // Lắng nghe payload từ MQTT để cập nhật realtime thẳng vào Cache
  React.useEffect(() => {
    if (payload) {
      console.log("Nhận được Telemetry mới:", payload);
      const currentTime = new Date().toISOString();
      const currentLabel = new Date(currentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // 1. Cập nhật Bảng (Table) Cache
      queryClient.setQueryData(['telemetry', deviceId], (oldData: any[]) => {
        const updated = oldData ? [...oldData] : [];
        Object.keys(payload).forEach(key => {
          const existingIndex = updated.findIndex(t => t.key === key);
          if (existingIndex !== -1) {
            updated[existingIndex] = { ...updated[existingIndex], value: payload[key], lastUpdate: currentTime };
          } else {
            updated.push({ key, value: payload[key], lastUpdate: currentTime });
          }
        });
        return updated;
      });


    }
  }, [payload, deviceId, queryClient]);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {isConnected ? (
        <Tag color="success">🟢 Dashboard: Đã kết nối MQTT (Lắng nghe dữ liệu)</Tag>
      ) : (
        <Tag color="warning">🔴 Dashboard: Mất kết nối MQTT</Tag>
      )}
      
      <Table 
        dataSource={telemetryData} 
        rowKey="key" 
        loading={isLoadingTelemetry}
        size="small"
        pagination={false}
      >
        <Table.Column dataIndex="lastUpdate" title="Thời gian" render={(v) => new Date(v).toLocaleString()} />
        <Table.Column dataIndex="key" title="Thông số (Key)" render={(v) => <strong>{v}</strong>} />
        <Table.Column dataIndex="value" title="Giá trị hiện tại" render={(v) => <Text style={{ fontSize: 16, fontWeight: 500, color: "#0B5D3B" }}>{v}</Text>} />
      </Table>
    </Space>
  );
};
