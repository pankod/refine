import React, { type HTMLAttributes, useState } from "react";
import snarkdown from "snarkdown";
import useBaseUrl from "@docusaurus/useBaseUrl";
// @ts-expect-error no types
import { useDoc } from "@docusaurus/theme-common/internal";
import { useHistory, useLocation } from "@docusaurus/router";
import clsx from "clsx";

import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { UnitCircle } from "../unit-circle";
import { TutorialCircle } from "../tutorial-circle";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";
import type { PreferredUIPackage } from "../../context/TutorialUIPackageContext";

const uiNames: Record<PreferredUIPackage, string> = {
  headless: "Headless",
  antd: "Ant Design",
  mui: "Material UI",
  mantine: "Mantine",
  "chakra-ui": "Chakra UI",
};
const baseIconUrl =
  "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/icons/colored/ui-framework-";

type LinkWithIdProps = HTMLAttributes<HTMLAnchorElement> & {
  id: string;
  isCurrent?: boolean;
  dangerouslySetInnerHTML?: { __html: string };
};

const LinkWithId = ({
  id,
  isCurrent,
  className,
  dangerouslySetInnerHTML,
  ...rest
}: LinkWithIdProps) => {
  const toUrl = useBaseUrl(`/docs/${id}`, { forcePrependBaseUrl: true });

  return (
    <a
      {...rest}
      href={toUrl}
      className={clsx(
        className,
        isCurrent
          ? "text-gray-800 dark:text-gray-0"
          : " hover:!text-refine-link-light active:!text-refine-link-light dark:hover:!text-refine-link-dark dark:active:!text-refine-link-dark",
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  );
};

const markdownConverter = (text: string) => {
  const numericStartRegexp = /^\d+\.\s?/g;
  // use this to get the numeric start
  const _numericStart = text.match(numericStartRegexp)?.[0] || "";
  const numericStartIgnore = text.replace(numericStartRegexp, "");

  const marked = snarkdown(numericStartIgnore);

  return `${marked}`;
};

const TutorialUIStatus = () => {
  const { preferred: preferredUIPackage } = useTutorialUIPackage();

  return (
    <div className="mt-4">
      <div className={clsx("rounded", " bg-gray-50 dark:bg-gray-800", "p-4")}>
        <div className={clsx("font-semibold text-sm leading-6")}>
          Current Framework
        </div>
        <div className={clsx("flex items-center justify-between", "pt-3")}>
          <div className="flex items-center gap-2">
            <img
              src={`${baseIconUrl}${preferredUIPackage}.svg`}
              className="h-auto w-6"
            />
            <span className="text-sm leading-6">
              {uiNames[preferredUIPackage]}
            </span>
          </div>
          <div>
            <LinkWithId
              id="tutorial/introduction/select-framework"
              className={clsx(
                "underline",
                "text-sm",
                "text-refine-link-light",
                "dark:text-refine-link-dark",
              )}
            >
              Change
            </LinkWithId>
          </div>
        </div>
      </div>
    </div>
  );
};

type TocLinkProps = {
  item: any;
  activeId?: string;
  setActiveId?: React.Dispatch<React.SetStateAction<string>>;
};

const TocLink: React.FC<TocLinkProps> = ({ item, activeId, setActiveId }) => {
  const location = useLocation();
  const history = useHistory();
  const { hash: locationHash } = location;

  React.useEffect(() => {
    const targetElement = document.getElementById(item.id);

    if (targetElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const hash = `#${item.id}`;
              if (hash !== locationHash) {
                setActiveId(item.id);
                window.history.replaceState({}, "", hash);
              }
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
  }, [item.id]);

  return (
    <a
      href={`#${item.id}`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
      dangerouslySetInnerHTML={{ __html: item.value }}
      className={clsx(
        "text-gray-800 dark:text-gray-0 hover:!text-refine-link active:!text-refine-link dark:hover:!text-refine-link-dark dark:active:!text-refine-link-dark",
        activeId === item.id &&
          "!text-refine-link-light dark:!text-refine-link-dark",
      )}
    />
  );
};

export const TutorialTOC = () => {
  const {
    toc,
    metadata: { id: currentDocId },
  } = useDoc();
  const currentTutorial = useCurrentTutorial();
  const { hash } = useLocation();

  const baseActiveId = `${hash}`.replace("#", "");

  const [selectedUnit, setSelectedUnit] = useState(currentTutorial.unit);
  const [activeId, setActiveId] = React.useState<string | undefined>(
    baseActiveId,
  );

  React.useEffect(() => {
    setActiveId(baseActiveId);
  }, [baseActiveId]);

  const renderTocItem = (item: (typeof toc)[number]) => {
    return (
      <li
        key={item.id}
        style={{
          marginLeft: (item.level - 2) * 12,
        }}
        className="mb-1"
      >
        <TocLink item={item} activeId={activeId} setActiveId={setActiveId} />
      </li>
    );
  };

  const renderTOC = () => {
    if (toc.length === 0) return null;
    return <ul className="mt-1 list-none pl-0">{toc.map(renderTocItem)}</ul>;
  };

  const renderUnitItem = (
    doc: NonNullable<typeof currentTutorial>["units"][number]["docs"][number],
  ) => {
    const formattedTitle = markdownConverter(doc.title);
    const unitNo = doc.title.split(".")[0];

    return (
      <li
        key={doc.id}
        className={clsx("flex flex-row items-start gap-2", "pb-4")}
      >
        <div className={clsx("mt-0.5", "h-8 w-8", "flex-shrink-0")}>
          <TutorialCircle
            id={doc.id}
            width="100%"
            height="100%"
            unitNo={Number.isNaN(Number(unitNo)) ? undefined : unitNo}
            isCurrent={doc.current}
          />
        </div>
        <div className="flex flex-col gap-2 pt-[6px]">
          <LinkWithId
            id={doc.id}
            isCurrent={doc.current}
            className={clsx("leading-[22px]", "no-underline", {
              "text-gray-900 dark:text-white": currentDocId === doc.id,
              "hover:cursor-default hover:no-underline hover:text-gray-900":
                doc.current,
            })}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          />

          {doc.current && renderTOC()}
        </div>
      </li>
    );
  };

  const renderUnitDocs = (
    unit?: NonNullable<typeof currentTutorial>["units"][number],
  ) => {
    return (
      <div>
        <ul className={clsx("list-none", "pl-0")}>
          {unit?.docs
            .sort((a, b) => `${a.title}`?.localeCompare(`${b.title}`))
            .map(renderUnitItem)}
        </ul>
      </div>
    );
  };

  const renderUnitTab = (unit: (typeof currentTutorial)["units"][number]) => {
    return (
      <button
        key={unit.no}
        type="button"
        data-unit-title={unit.title}
        data-unit-no={unit.no}
        data-unit-current={unit.unit === selectedUnit ? "true" : undefined}
        onClick={() => setSelectedUnit(unit.unit)}
        className={clsx(
          "tutorial-unit",
          unit.unit === selectedUnit &&
            "bg-gradient-to-t from-gray-50 dark:from-gray-700 from-40% to-gray-200 dark:to-gray-600",
          "-mb-1",
          "flex items-center justify-center",
          "w-[40px] h-[44px]",
          "cursor-pointer",
          "rounded-tl-[24px] rounded-tr-[24px]",
          "border-none",
          "font-semibold",
        )}
      >
        <UnitCircle
          unit={unit.unit}
          width="32px"
          height="32px"
          isSelected={unit.unit === selectedUnit}
        />
      </button>
    );
  };

  const currentUnit:
    | NonNullable<typeof currentTutorial>["units"][number]
    | undefined = currentTutorial?.units.find(
    (unit) => unit.unit === selectedUnit,
  );

  const isFirstUnit =
    currentTutorial?.units?.find((el) => el?.unit === currentTutorial?.unit)
      ?.no === 1;

  return (
    <div className={clsx("tutorial-tracker", "max-h-[calc(100vh-6rem]")}>
      <div
        className={clsx(
          "tutorial-units",
          "mb-1 px-2",
          "flex items-center gap-0.5",
        )}
      >
        {currentTutorial?.units.map(renderUnitTab)}
      </div>
      <div
        className={clsx(
          "rounded",
          "pt-6 px-3 pb-2",
          "bg-gray-50 dark:bg-gray-700",
        )}
      >
        {/* <div className={clsx("mb-2", "text-sm font-bold")}>
                    {currentUnit?.title ?? currentUnit?.unit ?? "-"}
                </div> */}
        <div className={clsx("text-sm")}>{renderUnitDocs(currentUnit)}</div>
      </div>
      {!isFirstUnit &&
        currentDocId !== "tutorial/introduction/select-framework" && (
          <TutorialUIStatus />
        )}
    </div>
  );
};

export const useDocTOCwithTutorial = () => {
  const tutorial = useCurrentTutorial();
  const { frontMatter, toc } = useDoc();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = (!hidden && toc.length > 0) || tutorial?.isTutorial;
  const tutorialTOC = canRender ? <TutorialTOC /> : undefined;

  return {
    hidden,
    tutorialTOC,
  };
};
