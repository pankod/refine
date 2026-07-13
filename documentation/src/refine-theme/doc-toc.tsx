import { useDoc } from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import React from "react";
import { useLocation } from "@docusaurus/router";

export const TOCItem = ({
  id,
  value,
  level,
  activeId,
  onIdChange,
}: {
  id: string;
  value: string;
  level: number;
  activeId: string;
  onIdChange?: (id: string) => void;
}) => {
  React.useEffect(() => {
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onIdChange(id);
            }
          });
        },
        {
          rootMargin: "0px 0px -80% 0px",
        },
      );

      observer.observe(targetElement);

      return () => {
        observer.unobserve(targetElement);
      };
    }
  }, [id]);

  const isActive = activeId === id;

  return (
    <a
      href={`#${id}`}
      className={clsx(
        "refine-toc-item",
        "py-2 pr-4",
        level === 2 && "pl-4",
        level === 3 && "pl-6",
        level === 4 && "pl-8",
        level === 5 && "pl-8",
        isActive && "bg-zinc-200 dark:bg-zinc-700",
        isActive && "text-zinc-900 dark:text-white",
        !isActive && "text-zinc-700 dark:text-zinc-300",
        !isActive && "hover:bg-zinc-100 dark:hover:bg-[#303035]",
        "rounded-md",
        "block",
        "text-sm",
        "no-underline hover:no-underline",
        "transition-colors duration-200 ease-in-out",
        "tracking-[-0.007em]",
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    />
  );
};

export const DocTOC = () => {
  const location = useLocation();

  const { toc, hasTOC, activeId, setActiveId } = useTOC();

  const onIdChange = (id) => {
    if (id !== `${location.hash ?? ""}`.replace("#", "")) {
      setActiveId(id);
      window.history.replaceState({}, "", `#${id}`);
    }
  };

  return (
    <div
      className={clsx(
        "hidden xl:block",
        "w-full",
        "sticky right-0 top-[69px]",
        "max-w-[240px]",
        "overflow-auto",
        "h-[calc(100vh-69px)]",
        "rounded-tl-xl",
        "bg-zinc-50 dark:bg-[#27272A80]",
        "p-4",
        !hasTOC && "invisible",
      )}
    >
      <ul>
        {toc
          .filter((item) => item.level < 5)
          .map((item) => {
            return (
              <li key={item.id}>
                <TOCItem
                  id={item.id}
                  value={item.value}
                  activeId={activeId}
                  level={item.level}
                  onIdChange={onIdChange}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export const useTOC = () => {
  const { hash } = useLocation();

  const baseActiveId = `${hash}`.replace("#", "");

  const [activeId, setActiveId] = React.useState<string | undefined>(
    baseActiveId,
  );

  React.useEffect(() => {
    setActiveId(baseActiveId);
  }, [baseActiveId]);

  const { toc } = useDoc();

  const hasTOC = toc?.length > 0;

  return {
    toc,
    activeId,
    setActiveId,
    hasTOC,
  };
};
