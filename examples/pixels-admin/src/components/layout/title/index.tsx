import React from "react";
import type { TitleProps } from "@refinedev/core";
import { Link } from "react-router";

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link to="/">
    {collapsed ? (
      <img
        src={"/pixels-admin-collapsed.svg"}
        alt="Pixels Admin"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
        }}
      />
    ) : (
      <img
        src={"/pixels-admin.svg"}
        alt="Pixels Admin"
        style={{
          width: "100%",
          height: "40px",
        }}
      />
    )}
  </Link>
);
