import { useState } from "react";
import { useNavigation, useParsed } from "@refinedev/core";
import { AppBar, Toolbar, Button, MenuList, MenuListItem } from "react95";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { goBack, create } = useNavigation();
  const { action, resource } = useParsed();

  return (
    <AppBar style={{ zIndex: 1 }}>
      <Toolbar>
        <Button variant="menu" onClick={() => setOpen(!open)} active={open}>
          File
        </Button>
        <Button variant="menu" disabled>
          Edit
        </Button>
        <Button variant="menu" disabled>
          View
        </Button>
        <Button variant="menu" disabled>
          Format
        </Button>
        <Button variant="menu" disabled>
          Tools
        </Button>
        <Button variant="menu" disabled>
          Table
        </Button>
        <Button variant="menu" disabled>
          Window
        </Button>
        <Button variant="menu" disabled>
          Help
        </Button>
        {open && (
          <MenuList
            style={{
              position: "absolute",
              left: "0",
              top: "100%",
            }}
            onClick={() => setOpen(false)}
          >
            {action !== "list" && (
              <MenuListItem
                onClick={() => {
                  goBack();
                }}
              >
                Back to {resource?.name}
              </MenuListItem>
            )}
            {action === "list" && (
              <MenuListItem
                onClick={() => {
                  create(resource?.name ?? "");
                }}
              >
                Create {resource?.name}
              </MenuListItem>
            )}
          </MenuList>
        )}
      </Toolbar>
    </AppBar>
  );
};
