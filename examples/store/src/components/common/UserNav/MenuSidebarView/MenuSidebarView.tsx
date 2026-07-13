import Link from "next/link";
import { useUI } from "@lib/context";

import { SidebarLayout } from "@components/common/SidebarLayout";

import s from "./MenuSidebarView.module.css";

interface MenuSidebarViewProps {
  links: { title: string; id: string }[];
}

export const MenuSidebarView: React.FC<MenuSidebarViewProps> = ({ links }) => {
  const { closeSidebar } = useUI();

  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/search">All</Link>
            </li>
            {links.map((l) => (
              <li key={l.id} className={s.item} onClick={() => closeSidebar()}>
                <Link href={`/search/${l.id}`}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  );
};
