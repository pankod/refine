import React from "react";
import { availableUIPackages } from "../../context/TutorialUIPackageContext";
import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import {
  getTutorialsByUnit,
  useTutorialChecklists,
} from "../../hooks/use-tutorial-checklists";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";
import clsx from "clsx";

type Props = {
  unit: string;
  width: string;
  height: string;
  isSelected?: boolean;
};

export const UnitCircle: React.FC<Props> = ({
  unit: unitName,
  isSelected,
  width = "100px",
  height = "100px",
}) => {
  const { units } = useCurrentTutorial();
  const { items } = useTutorialChecklists();

  const { current: currentUIPackage } = useTutorialUIPackage();

  const filterNotPreferred = (doc: { id: string }) => {
    const splitted = doc.id.split("/");

    const unwantedPackages = availableUIPackages.filter(
      (el) => el !== currentUIPackage,
    );

    return !splitted.find((el) => unwantedPackages.includes(el as any));
  };

  const unitItems = [...getTutorialsByUnit(unitName, items)]
    .filter((item) => filterNotPreferred(item))
    .sort((a, b) => `${a.title}`?.localeCompare(`${b.title}`));

  const unitItemStatuses = unitItems.map((item) => {
    const allCompleted =
      item.checklist.length > 0 &&
      item.checklist.every((check) => check.checked);
    const someCompleted =
      item.checklist.length > 0 &&
      item.checklist.some((check) => check.checked);

    return {
      ...item,
      status: allCompleted
        ? "completed"
        : someCompleted
          ? "in-progress"
          : "not-started",
    };
  });

  const unit = units.find((unit) => unit.unit === unitName);

  const r = 45;
  const cx = 50;
  const cy = 50;
  const strokeWidth = 6;
  const standardOffsetLength = 20;
  const completedColor = "#48bb78";

  const parts = unitItems.length;

  const circumference = 2 * Math.PI * r;

  const arcAngle = 360 / parts;
  const arcLength = (circumference / 360) * arcAngle;

  const alignmentOffsetArcAngle = 90 - arcAngle;
  const alignmentOffsetArcLength =
    (circumference / 360) * alignmentOffsetArcAngle;

  const offsetDeviationRate = 1 / 2;
  const standardOffsetDeviation = standardOffsetLength * offsetDeviationRate;

  // const offsetForSingle = (index: number) => arcLength * (index + 1);
  const offsetForSingle = (index: number) => arcLength * index * -1 + arcLength;

  const baseOffset = alignmentOffsetArcLength - standardOffsetDeviation;

  const dash = arcLength - standardOffsetLength;
  const gapForEach = standardOffsetLength;
  const gapForSingle = circumference - arcLength + standardOffsetLength;

  const dashArrayMultiple = `${dash} ${gapForEach}`;
  const dashArraySingle = `${dash} ${gapForSingle}`;

  const dashOffsetMultiple = baseOffset;

  const dashOffsetSingle = (index: number) =>
    offsetForSingle(index) + baseOffset;

  return (
    <svg width={width} height={height} viewBox="0 0 100 100">
      <circle
        className="empty-dashes stroke-gray-500 dark:stroke-gray-600"
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArrayMultiple}
        strokeDashoffset={dashOffsetMultiple}
      />
      {unitItemStatuses.map((item, index) => {
        if (item.status === "completed") {
          return (
            <circle
              key={index}
              className="filled-dash"
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke={completedColor}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArraySingle}
              strokeDashoffset={dashOffsetSingle(index)}
            />
          );
        }
        return null;
      })}
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        // style={{
        //     fill: unitItemStatuses.every(
        //         (el) => el.status === "completed",
        //     )
        //         ? completedColor
        //         : "var(--tutorial-toc-text-color-light)",
        // }}
        className={clsx("text-[2.5rem]", {
          "text-gray-500 dark:text-gray-400": !isSelected,
          "text-gray-800 dark:text-gray-0": isSelected,
        })}
      >
        {unit.no}
      </text>
    </svg>
  );
};
