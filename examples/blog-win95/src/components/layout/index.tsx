import type { PropsWithChildren } from "react";

import { Footer } from "../footer";
import { Header } from "../header";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <div
        style={{
          padding: "72px 24px 24px 24px",
          backgroundColor: "rgb(0, 128, 128)",
          minHeight: "calc(100vh - 48px - 72px - 24px)",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};
