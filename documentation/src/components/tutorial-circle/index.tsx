import React from "react";
import { useTutorialChecklists } from "../../hooks/use-tutorial-checklists";
import clsx from "clsx";

type Props = {
  id: string;
  width: string;
  height: string;
  unitNo?: string;
  isCurrent?: boolean;
};

export const TutorialCircle: React.FC<Props> = ({
  id: tutorialId,
  width = "100px",
  height = "100px",
  unitNo,
  isCurrent,
}) => {
  const { items } = useTutorialChecklists();

  const tutorialItem = items.find((el) => el.id === tutorialId);

  const tutorialChecks = tutorialItem?.checklist || [];

  const tutorialCheckStatuses = tutorialChecks.map((item) => {
    const completed = item.checked;
    return {
      ...item,
      status: completed ? "completed" : "not-started",
    };
  });

  const r = 45;
  const cx = 50;
  const cy = 50;
  const strokeWidth = 6;
  const standardOffsetLength = 20;
  const emptyColor = "#6C7793";
  const completedColor = "#48bb78";

  const parts = tutorialCheckStatuses.length;

  const circumference = 2 * Math.PI * r;

  const arcAngle = 360 / parts;
  const arcLength = (circumference / 360) * arcAngle;

  const alignmentOffsetArcAngle = 90 - arcAngle;
  const alignmentOffsetArcLength =
    (circumference / 360) * alignmentOffsetArcAngle;

  const offsetDeviationRate = 1 / 2;
  const standardOffsetDeviation = standardOffsetLength * offsetDeviationRate;

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
        className={clsx("empty-dashes", "text-gray-300 dark:text-gray-500")}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArrayMultiple}
        strokeDashoffset={dashOffsetMultiple}
        stroke="currentColor"
      />
      {unitNo && (
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="currentColor"
          className={clsx("text-[2.5rem]", {
            "text-gray-500 dark:text-gray-400": !isCurrent,
            "text-gray-800 dark:text-gray-0": isCurrent,
          })}
        >
          {unitNo}
        </text>
      )}
      {tutorialCheckStatuses.map((item, index) => {
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
    </svg>
  );
};
