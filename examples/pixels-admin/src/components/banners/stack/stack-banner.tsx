import { Image, Space } from "antd";

export function StackBanner() {
  return (
    <Space
      style={{
        width: "320px",
        height: "56px",
        background: "#242436",
        borderBottom: "1px solid #f5f5f5",
        borderRadius: "0 0 16px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Image height={24} src="/tech-logos.png" />
    </Space>
  );
}
