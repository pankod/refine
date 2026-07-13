import { useMenu } from "@refinedev/core";
import { NavLink } from "react-router";

export const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="sticky top-0 z-50 menu mx-0 bg-white">
      <ul className="mx-0 flex justify-start items-center">
        {menuItems.map((item) => (
          <li key={item?.key} className="mx-0 flex justify-start items-center">
            <div className="text-gray-600">
              <NavLink
                className="text-lg flex items-center"
                to={item?.route ?? "/"}
              >
                <span className="mr-2">{item?.icon}</span>
                {item?.label}
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
