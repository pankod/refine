import React from "react";
import type { LayoutProps } from "@refinedev/core";
import styled from "styled-components";

import { Header } from "../header";

const Wrapper = styled.div`
    width: 80%;
    margin: 50px auto;
    height: 100%;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
