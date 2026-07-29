import React from 'react';
import { useTable } from '@refinedev/antd';
import { Spin, Typography } from 'antd';

/**
 * ============================================================================
 * COMPONENT: GLOBAL PRELOADER (Màn Hình Chờ Khởi Tạo Ứng Dụng)
 * ============================================================================
 * Nhiệm vụ:
 * Component này đóng vai trò chặn cửa (block) toàn bộ giao diện sau khi đăng nhập thành công.
 * Nó tiến hành tải dữ liệu tĩnh cốt lõi của ứng dụng (Thiết bị, Users, Roles, Groups).
 * Trong lúc tải, nó hiện màn hình Splash Screen (Logo + Vòng xoay).
 * Điều này mô phỏng chuẩn xác kiến trúc Bootstrap của ThingsBoard.
 */

import { useQueryClient } from '@tanstack/react-query';

export const GlobalPreloader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  
  React.useEffect(() => {
    // Debug cache keys when ready
    // console.log("CACHE KEYS:", queryClient.getQueryCache().getAll().map(q => q.queryKey));
  });
  // Lệnh useTable này sẽ báo cho React Query biết để tải dữ liệu,
  // Cache Key sinh ra sẽ khớp 100% với Cache Key của các bảng danh sách bên trong hệ thống.
  // syncWithLocation: false đảm bảo nó không đọc URL lung tung lúc prefetch
  
  const { tableProps: tDevices } = useTable({ resource: 'devices', syncWithLocation: false });
  const { tableProps: tUsers } = useTable({ resource: 'users', syncWithLocation: false });
  const { tableProps: tRoles } = useTable({ resource: 'roles', syncWithLocation: false });
  const { tableProps: tGroups } = useTable({ resource: 'groups', syncWithLocation: false });

  // tableProps.loading is true when the query is fetching for the first time
  const isReady = !tDevices.loading && !tUsers.loading && !tRoles.loading && !tGroups.loading;

  if (!isReady) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <img src="/logo-full.png" alt="Green IQ" className="pulse-logo" style={{ height: '70px', marginBottom: '32px' }} />
        <Spin size="large" />
        <Typography.Text style={{ marginTop: 12 }}>Đang tải dữ liệu nền tảng...</Typography.Text>
      </div>
    );
  }

  return <>{children}</>;
};
