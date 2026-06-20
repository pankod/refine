import { Layout as AntdLayout, Radio } from "antd";
import type { IHeaderProps } from "../interfaces/IHeaderProps";

export const Header: React.FC<IHeaderProps> = ({ role }) => {
  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "48px",
        backgroundColor: "#FFF",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Radio.Group
        value={role}
        onChange={(event) => {
          localStorage.setItem("role", event.target.value);
          location.reload();
        }}
      >
        <Radio.Button value="admin">Admin</Radio.Button>
        <Radio.Button value="editor">Editor</Radio.Button>
      </Radio.Group>
    </AntdLayout.Header>
  );
};
