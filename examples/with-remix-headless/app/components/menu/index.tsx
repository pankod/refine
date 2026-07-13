import { useLogout, useMenu } from "@refinedev/core";
import { NavLink } from "@remix-run/react";

export const Menu = () => {
  const { mutate: logout } = useLogout();
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
      <button onClick={() => logout()}>Logout</button>
    </nav>
  );
};
