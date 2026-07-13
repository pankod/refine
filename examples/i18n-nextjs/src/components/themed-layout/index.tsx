"use client";

import { Header } from "@components/header";
import { ThemedLayout as BaseLayout } from "@refinedev/antd";
import React from "react";

export const ThemedLayout = ({ children }: React.PropsWithChildren) => {
  return <BaseLayout Header={() => <Header sticky />}>{children}</BaseLayout>;
};
