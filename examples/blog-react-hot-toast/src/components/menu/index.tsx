import { useMenu } from "@refinedev/core";
import { NavLink } from "react-router";

export const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <NavLink to={item.route ?? "/"}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
