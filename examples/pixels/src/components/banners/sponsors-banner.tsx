import { Image } from "antd";

export function SponsorsBanner() {
  return (
    <div
      style={{
        width: "320px",
        height: "56px",
        background: "#242436",
        borderBottom: "1px solid #f5f5f5",
        borderRadius: "0 0 16px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <Image
        height={24}
        preview={false}
        src="/sponsors.png"
        alt="Made with refine and Supabase"
      />
    </div>
  );
}
