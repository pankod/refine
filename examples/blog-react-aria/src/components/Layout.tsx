import { useMenu, useNavigation, type LayoutProps } from "@refinedev/core";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { menuItems } = useMenu();
  const { push } = useNavigation();
  return (
    <div className="App">
      <div className="flex min-h-screen flex-col">
        <div className="mb-2 border-b py-2">
          <div className="container mx-auto">
            <div className="flex items-center gap-2">
              <img
                className="w-32"
                src="https://refine.dev/img/refine_logo.png"
                alt="Logo"
              />
              <ul>
                {menuItems.map(({ name, label, icon, route }) => (
                  <li key={name} className="float-left">
                    <a
                      className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out hover:underline"
                      onClick={() => push(route || "")}
                    >
                      {icon}
                      <span>{label ?? name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white">{children}</div>
      </div>
    </div>
  );
};
