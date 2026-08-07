"use client";

import { Header } from "@components/header";
import { ThemedLayout as AntdLayout } from "@refinedev/antd";
import React from "react";

export const ThemedLayout = ({ children }: React.PropsWithChildren) => {
  return <AntdLayout Header={() => <Header sticky />}>{children}</AntdLayout>;
};
