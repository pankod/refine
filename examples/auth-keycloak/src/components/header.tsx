import React from "react";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { Layout as AntdLayout, Typography, Avatar, Space, Dropdown, MenuProps, Modal } from "antd";
import { DownOutlined, LogoutOutlined, UserOutlined, IdcardOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const CustomHeader: React.FC = () => {
  const { data: user } = useGetIdentity<{ name: string; avatar?: string }>();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: "Xác nhận đăng xuất",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?",
      okText: "Đăng xuất",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        logout();
      },
    });
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "account",
      label: "Thông tin tài khoản",
      icon: <IdcardOutlined />,
      onClick: () => navigate("/account"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <AntdLayout.Header
      style={{
        backgroundColor: "#0B5D3B",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        boxShadow: "0 1px 4px rgba(0,21,41,0.08)"
      }}
    >
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <Space style={{ cursor: "pointer" }}>
          <Typography.Text strong style={{ color: "#ffffff" }}>{user?.name}</Typography.Text>
          <Avatar src={user?.avatar} alt={user?.name} icon={<UserOutlined />} style={{ backgroundColor: "#2FA84F" }} />
          <DownOutlined style={{ fontSize: "12px", color: "#ffffff" }} />
        </Space>
      </Dropdown>
    </AntdLayout.Header>
  );
};
