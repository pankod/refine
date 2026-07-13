import React from "react";
import {
  useMenu,
  type LayoutProps,
  type TreeMenuItem as ITreeMenu,
} from "@refinedev/core";
import { Link } from "react-router";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { menuItems, selectedKey } = useMenu();

  const renderMenuItems = (items: ITreeMenu[]) => {
    return (
      <>
        {items.map(({ name, label, icon, route }) => {
          const isSelected = route === selectedKey;

          return (
            <li key={name}>
              {route ? (
                <Link
                  to={route}
                  style={{
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  {icon}
                  <span>{label ?? name}</span>
                </Link>
              ) : (
                <div>
                  {icon}
                  <span>{label ?? name}</span>
                </div>
              )}
            </li>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div>
        <Link to="/">
          <img src="https://refine.dev/img/refine_logo.png" alt="Logo" />
        </Link>
        <ul>{renderMenuItems(menuItems)}</ul>
      </div>
      <div>{children}</div>
    </div>
  );
};
