import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useKeycloak } from "@react-keycloak/web";
import { Card, Avatar, Typography, Row, Col, Space, Divider, Button, Modal, Form, Input, message } from "antd";
import { UserOutlined, MailOutlined, IdcardOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

export const AccountPage: React.FC = () => {
  const { data: user } = useGetIdentity<{
    name: string;
    avatar?: string;
    email?: string;
    username?: string;
  }>();

  const { keycloak } = useKeycloak();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    // Tách First Name và Last Name tạm thời từ Full Name
    const nameParts = user?.name?.split(" ") || [];
    const lastName = nameParts.length > 1 ? nameParts[0] : "";
    const firstName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : user?.name;
    
    form.setFieldsValue({
      firstName: firstName || "",
      lastName: lastName || "",
      email: user?.email || "",
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async (values: { firstName: string; lastName: string; email: string }) => {
    if (!keycloak?.token) return;
    setLoading(true);
    try {
      const baseUrl = keycloak.authServerUrl?.replace(/\/$/, "");
      const realm = keycloak.realm;
      
      // Gửi yêu cầu cập nhật lên Keycloak Account API
      await axios.post(
        `${baseUrl}/realms/${realm}/account`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          username: user?.username, // Đính kèm username vì một số phiên bản KC yêu cầu
        },
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        }
      );
      
      message.success("Cập nhật thành công! Có thể cần đăng nhập lại để làm mới thông tin.");
      setIsModalOpen(false);
      
      // Cố gắng làm mới token để lấy thông tin mới (đôi khi KC cần thời gian đồng bộ)
      await keycloak.updateToken(5);
    } catch (error: any) {
      console.error("Update profile error:", error);
      message.error("Lỗi khi cập nhật: " + (error.response?.data?.errorMessage || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card 
        title="Thông tin tài khoản" 
        extra={
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={handleOpenModal}
          >
            Chỉnh sửa thông tin
          </Button>
        }
        style={{ maxWidth: 800, margin: "0 auto", marginTop: 24 }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col span={24} style={{ textAlign: "center" }}>
            <Avatar 
              size={120} 
              src={user?.avatar} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: "#0B5D3B" }} 
            />
            <Title level={3} style={{ marginTop: 16 }}>{user?.name || "Người dùng"}</Title>
            <Text type="secondary">@{user?.username || "username"}</Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Text type="secondary"><MailOutlined /> Địa chỉ Email</Text>
              <Text strong>{user?.email || "Chưa cập nhật"}</Text>
            </Space>
          </Col>
          <Col xs={24} sm={12}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Text type="secondary"><IdcardOutlined /> Tên đăng nhập</Text>
              <Text strong>{user?.username}</Text>
            </Space>
          </Col>
        </Row>
      </Card>

      <Modal
        title="Chỉnh sửa thông tin"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
        okText="Lưu thay đổi"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Họ (Last Name)" name="lastName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tên (First Name)" name="firstName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled={true} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
