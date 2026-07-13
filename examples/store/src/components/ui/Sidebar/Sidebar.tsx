import { useEffect, useRef, type PropsWithChildren } from "react";
import cn, { clsx } from "clsx";

import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import s from "./Sidebar.module.css";
interface SidebarProps {
  onClose: () => void;
}

export const Sidebar: React.FC<PropsWithChildren<SidebarProps>> = ({
  children,
  onClose,
}) => {
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.focus();
    }

    const contentElement = contentRef.current;

    if (contentElement) {
      disableBodyScroll(contentElement, { reserveScrollBarGap: true });
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <div
      className={cn(s.root)}
      ref={sidebarRef}
      onKeyDown={onKeyDownSidebar}
      tabIndex={1}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className={s.backdrop} onClick={onClose} />
        <section className="absolute inset-y-0 right-0 flex w-full max-w-full outline-none md:w-auto md:pl-10">
          <div className="h-full w-full md:w-screen md:max-w-md py-4 px-4">
            <div className={clsx(s.sidebar, "rounded-2xl")} ref={contentRef}>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
