import { useMenu } from "@refinedev/core";
import { NavLink } from "react-router";

export const Menu = () => {
  const { menuItems } = useMenu();
  return (
    <nav className="mb-4">
      <ul className="flex border-b-1 py-2">
        {menuItems.map((item) => (
          <li key={item.key} className="mr-4">
            <NavLink
              to={item.route ?? "/"}
              className={({ isActive, isPending }) => {
                if (isActive) {
                  return "text-center block text-blue-500 rounded hover:bg-gray-200 p-2";
                }
                return "text-center block border-blue-500 rounded hover:bg-gray-200 p-2";
              }}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
