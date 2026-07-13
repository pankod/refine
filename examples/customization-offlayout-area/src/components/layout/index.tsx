import type { LayoutProps } from "@refinedev/core";
import { Layout as AntdLayout, Grid } from "antd";

export const Layout: React.FC<LayoutProps> = ({
  children,
  Header,
  Footer,
  Sider,
  OffLayoutArea,
}) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <AntdLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
      {Sider && <Sider />}
      <AntdLayout style={{ marginLeft: 200 }}>
        {Header && <Header />}
        <AntdLayout.Content>
          <div
            style={{
              padding: breakpoint.sm ? 24 : 12,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </AntdLayout.Content>
        {Footer && <Footer />}
      </AntdLayout>
      {OffLayoutArea && <OffLayoutArea />}
    </AntdLayout>
  );
};
