import clsx from "clsx";
import React, { type FC, type PropsWithChildren } from "react";
import { CloseIcon } from "./icons/close";
import { Transition } from "@headlessui/react";
import { createPortal } from "react-dom";
import { useScroll } from "framer-motion";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useOutsideClick } from "../hooks/use-outside-click";
import { useKeyDown } from "../hooks/use-keydown";

type Props = {
  title?: string;
  onClose: () => void;
  open: boolean;
  variant: "templates" | "blog";
};

export const CommonDrawer: FC<PropsWithChildren<Props>> = (props) => {
  React.useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [props.open]);

  return (
    <BrowserOnly>
      {() => createPortal(<DrawerComponent {...props} />, document.body)}
    </BrowserOnly>
  );
};

const DEFAULT_TOP_OFFSET = 48;

const DrawerComponent: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  open,
  onClose,
  variant,
}) => {
  const [topOffset, setTopOffset] = React.useState(DEFAULT_TOP_OFFSET);
  const { scrollY } = useScroll();

  const drawerRef = React.useRef<HTMLDivElement>(null);
  useOutsideClick(drawerRef, (event) => {
    event.stopPropagation();
    onClose();
  });
  useKeyDown(drawerRef, ["Escape"], () => {
    onClose();
  });

  // this is required for the <TopAnnouncement /> component.
  React.useEffect(() => {
    const unsubscribeScrollY = scrollY.onChange((latest) => {
      if (latest >= 48) {
        setTopOffset(0);
        return;
      }
      setTopOffset(DEFAULT_TOP_OFFSET - latest);
    });

    return () => unsubscribeScrollY();
  }, []);

  return (
    <div
      style={{
        top: topOffset,
      }}
      className={clsx(
        "fixed",
        "right-0 bottom-0",
        "z-modal",
        !open && "pointer-events-none",
      )}
    >
      <Transition
        ref={drawerRef}
        as="div"
        className={clsx(
          "z-modal",
          "flex flex-col",
          "w-[240px] h-full",
          "ml-auto",
          "p-4",
          variant === "templates" && "bg-zinc-0 dark:bg-zinc-900 ",
          variant === "blog" && "bg-white dark:bg-zinc-700",
          "border-l dark:border-zinc-800",
          "dark:shadow-[0_0_72px_24px_#14141F]",
          "shadow-[0_0_72px_24px_rgba(20, 20, 31, 0.50)]",
        )}
        show={open}
        enter="transition-transform duration-300 transition-ease-in-out"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300 transition-ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div
          className={clsx(
            "flex",
            "items-center",
            "justify-between",
            "mb-10",
            "dark:text-zinc-300 text-zinc-900",
          )}
        >
          <h3 className={clsx("text-base", "font-semibold")}>{title}</h3>
          <button
            type="button"
            className={clsx("appearance-none")}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={clsx("overflow-auto h-full")}>{children}</div>
      </Transition>
    </div>
  );
};
