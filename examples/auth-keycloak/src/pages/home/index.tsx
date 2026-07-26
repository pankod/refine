import React, { useState, useEffect } from "react";
import { Typography, Card, Button, List, Space, Skeleton, Empty, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useList, useOne } from "@refinedev/core";

const { Title, Text } = Typography;

export const HomeDashboard: React.FC = () => {
  const [selectedDashboardId, setSelectedDashboardId] = useState<string | null>(null);

  // Load selected dashboard from localStorage on mount
  useEffect(() => {
    const savedId = localStorage.getItem("home_dashboard_id");
    if (savedId) {
      setSelectedDashboardId(savedId);
    }
  }, []);

  // Fetch the selected dashboard details
  const { data: selectedDashboardData, isLoading: isLoadingSelected } = useOne({
    resource: "dashboards",
    dataProviderName: "dashboards",
    id: selectedDashboardId || "",
    queryOptions: {
      enabled: !!selectedDashboardId,
    },
  });

  // Fetch all available dashboards for the modal
  const { data: dashboardsData, isLoading: isLoadingList } = useList({
    resource: "dashboards",
    dataProviderName: "dashboards",
  });

  const handleSelect = (id: string) => {
    setSelectedDashboardId(id);
    localStorage.setItem("home_dashboard_id", id);
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <Title level={2} style={{ margin: 0 }}>Trang chủ</Title>
        <Select
          showSearch
          style={{ width: 350 }}
          placeholder="Tìm và chọn Bảng điều khiển..."
          optionFilterProp="children"
          loading={isLoadingList}
          value={selectedDashboardId}
          onChange={handleSelect}
          filterOption={(input, option) =>
            (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
          }
          options={(dashboardsData?.data || []).map(d => ({
            value: d.id,
            label: d.title
          }))}
        />
      </div>

      {!selectedDashboardId ? (
        <Card style={{ textAlign: "center", padding: "40px" }}>
          <Empty 
            description={
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Chưa có Bảng điều khiển nào được chọn làm Trang chủ.<br/>
                Vui lòng tìm và chọn ở góc trên bên phải.
              </Text>
            } 
          />
        </Card>
      ) : isLoadingSelected ? (
        <Card>
          <Skeleton active />
        </Card>
      ) : selectedDashboardData?.data ? (
        <Card 
          title={selectedDashboardData.data.title}
          style={{ minHeight: "500px", display: "flex", flexDirection: "column" }}
          bodyStyle={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5" }}
        >
          <div style={{ textAlign: "center" }}>
            <Title level={4} type="secondary">
              [Vùng hiển thị iFrame Grafana / Thingsboard]
            </Title>
            <Text type="secondary">{selectedDashboardData.data.description}</Text>
          </div>
        </Card>
      ) : (
        <Card>
          <Text type="danger">Lỗi: Không tìm thấy Bảng điều khiển. Vui lòng chọn lại.</Text>
        </Card>
      )}


    </div>
  );
};
