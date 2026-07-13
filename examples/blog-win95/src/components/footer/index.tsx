import React, { useState } from "react";
import { useGo, useLogout } from "@refinedev/core";
import { AppBar, Toolbar, Button, MenuList, MenuListItem } from "react95";

export const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { mutate: logout } = useLogout();
  const go = useGo();

  return (
    <AppBar style={{ top: "unset", bottom: 0 }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold" }}
          >
            <img
              src="https://raw.githubusercontent.com/refinedev/refine/main/logo.png"
              alt="refine logo"
              style={{ height: "20px", marginRight: 4 }}
            />
          </Button>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "0",
                bottom: "100%",
              }}
              onClick={() => setOpen(false)}
            >
              <MenuListItem
                onClick={() => {
                  go({ to: "posts", type: "push" });
                }}
              >
                Posts
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  go({ to: "categories", type: "push" });
                }}
              >
                Categories
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  logout();
                }}
              >
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
