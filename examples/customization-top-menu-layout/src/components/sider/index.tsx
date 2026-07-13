import React from "react";
import { useMenu, useRefineOptions } from "@refinedev/core";
import { Menu } from "antd";
import { Link } from "react-router";

export const CustomSider: React.FC = () => {
  const { menuItems, selectedKey } = useMenu();
  const { title } = useRefineOptions();

  return (
    <>
      {title.text}
      <Menu theme="dark" selectedKeys={[selectedKey]} mode="horizontal">
        {menuItems.map(({ icon, route, label }) => (
          <Menu.Item key={route} icon={icon}>
            <Link to={route ?? ""}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};
