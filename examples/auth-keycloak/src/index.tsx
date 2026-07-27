import React from "react";
import { createRoot } from "react-dom/client";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import axios from "axios";

import App from "./App";

/**
 * ============================================================================
 * MODULE: ENTRY POINT (Điểm Khởi Chạy Giao Diện Web)
 * ============================================================================
 * Tập tin này là nơi đầu tiên được chạy khi tải trang web.
 * Nhiệm vụ:
 * 1. Khởi tạo kết nối với máy chủ SSO (Keycloak).
 * 2. Bao bọc toàn bộ ứng dụng (App) bằng ReactKeycloakProvider để truyền Token JWT
 *    xuống mọi trang bên trong.
 * 3. Tự động gắn Token vào tất cả các yêu cầu gọi API (axios) để chứng thực.
 */

// 1. Cấu hình Keycloak Client (Trỏ tới máy chủ auth.greeniq.vn)
const keycloak = new Keycloak({
  clientId: "refine-client", // Tên ứng dụng khai báo trên Keycloak
  url: "https://auth.greeniq.vn", // Domain của máy chủ Keycloak
  realm: "master", // Tên Không gian làm việc (Realm) trên Keycloak
});

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);

root.render(
    // 2. ReactKeycloakProvider: Đóng vai trò làm bảo vệ vòng ngoài cùng
    // Nó sẽ tự động gọi API lên auth.greeniq.vn để kiểm tra xem người dùng đã đăng nhập chưa
    <ReactKeycloakProvider 
      authClient={keycloak}
      // Tắt iframe ẩn để tránh lỗi đăng nhập vòng lặp trên một số trình duyệt chặn cookie bên thứ 3
      initOptions={{ checkLoginIframe: false }}
      // Bắt các sự kiện của Keycloak
      onEvent={(event) => {
        // Nếu Token bị hết hạn -> Tự động xin cấp lại Token mới (Refresh Token) để người dùng không bị văng ra
        if (event === "onTokenExpired") {
          keycloak.updateToken(30).catch(() => {
            console.error("Failed to refresh token");
          });
        }
      }}
      // Mỗi khi nhận được Token mới (lúc mới đăng nhập hoặc vừa refresh xong)
      onTokens={(tokens) => {
        if (tokens?.token) {
          // 3. Tự động bơm Token này vào thư viện Axios
          // Để từ giờ trở đi, mọi lúc Frontend gọi Backend (app.get, app.post), nó đều tự động mang theo Thẻ VIP (Token).
          axios.defaults.headers.common["Authorization"] = `Bearer ${tokens.token}`;
        }
      }}
    >
      <App />
    </ReactKeycloakProvider>
);
