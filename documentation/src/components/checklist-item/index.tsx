import React from "react";
import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useTutorialChecklists } from "../../hooks/use-tutorial-checklists";
import clsx from "clsx";

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={6}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 3 2 2 4-4"
    />
  </svg>
);

type Props = React.PropsWithChildren<{ id: string }>;

const ChecklistItem: React.FC<Props> = ({ children, id: checkId }) => {
  const { id } = useCurrentTutorial();

  const { items, toggle } = useTutorialChecklists();

  const tutorialChecks = items.find((item) => item.id === id);

  const checked = tutorialChecks?.checklist.find(
    (item) => item.id === checkId,
  )?.checked;

  const handleToggle = () => {
    toggle(id, checkId);
  };

  return (
    <label
      className={clsx(
        "mt-4",
        "flex",
        "items-center justify-start",
        "flex-nowrap",
        "gap-2",
        "cursor-pointer",
      )}
    >
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={handleToggle}
          className={clsx(
            "appearance-none",
            "flex items-center justify-center",
            "w-4 h-4",
            "rounded",
            "border",
            {
              "border-gray-400 dark:border-gray-500": !checked,
              "border-refine-react-dark-link dark:border-refine-react-dark-link":
                checked,
              "bg-refine-react-dark-link": checked,
            },
          )}
        >
          {checked && <CheckIcon />}
        </button>
      </div>
      <div
        className={clsx(
          checked &&
            "line-through dark:text-gray-100 dark:text-opacity-50 text-gray-800 text-opacity-50",
          !checked && "text-gray-800 dark:text-gray-100",
        )}
      >
        {children}
      </div>
    </label>
  );
};

export default ChecklistItem;
