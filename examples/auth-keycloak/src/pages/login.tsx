import React, { useEffect } from "react";
import { useLogin } from "@refinedev/core";
import { Spin } from "antd";

export const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();

  useEffect(() => {
    // Tự động kích hoạt luồng đăng nhập (chuyển hướng sang Keycloak) ngay khi load trang
    // Điều này giúp loại bỏ bước đệm phải bấm nút "Sign In" thủ công, chuẩn SSO Production.
    login({});
  }, [login]);

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Spin size="large" />
      <h2 style={{ marginTop: 24, color: "#0B5D3B" }}>Đang chuyển hướng đến Hệ thống Đăng nhập An toàn (SSO)...</h2>
      <p style={{ color: "#666" }}>Vui lòng đợi giây lát, hệ thống đang kết nối tới auth.greeniq.vn</p>
    </div>
  );
};
