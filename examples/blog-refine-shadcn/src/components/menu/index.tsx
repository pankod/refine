import { useLogout, useMenu } from "@refinedev/core";
import { NavLink } from "react-router";
import { Button } from "../ui/button";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      <ul className="md:fixed flex justify-start items-center md:items-start">
        {menuItems.map((item) => (
          <li className="text-sm" key={item.key}>
            <Button variant="ghost" className="flex gap-1">
              <span>{item?.icon}</span>
              <NavLink className="" to={item.route ?? "/"}>
                {item.label}
              </NavLink>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
