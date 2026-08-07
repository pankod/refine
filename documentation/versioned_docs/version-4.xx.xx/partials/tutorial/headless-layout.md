```css live shared
body {
  margin: 0px;
}

table {
  border-spacing: 0;
  border: 1px solid black;
}

table th,
td {
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}

table tr:last-child td {
  border-bottom: 0;
}

table th,
td {
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}

table th:last-child,
td:last-child {
  border-right: 0;
}

.layout {
  display: flex;
  gap: 16px;
}

@media screen and (max-width: 751px) {
  .layout {
    display: block;
  }
}

.layout .content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.breadcrumb {
  display: flex;
  gap: 24px;
  list-style-type: "/  ";
  padding: 8px 16px;
  border-bottom: 1px solid lightgray;
}

.breadcrumb a {
  color: blue;
  text-decoration: none;
}

.menu {
  flex-shrink: 0;
  padding: 8px 16px;
  border-right: 1px solid lightgray;
}

.menu a {
  color: black;
}

.menu .active {
  font-weight: bold;
}

@media screen and (max-width: 751px) {
  .menu {
    border-right: none;
    border-bottom: 1px solid lightgray;
  }
}

.menu ul {
  padding-left: 16px;
}
```

```tsx live shared
import { PropsWithChildren } from "react";
import { useMenu, useBreadcrumb } from "@refinedev/core";
import { NavLink, Link } from "react-router";

const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ul className="breadcrumb">
      {breadcrumbs.map((breadcrumb) => (
        <li key={`breadcrumb-${breadcrumb.label}`}>
          {breadcrumb.href ? (
            <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
          ) : (
            <span>{breadcrumb.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

const Menu = () => {
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

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
```
