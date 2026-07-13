import React from "react";

type TKpiCardProps = {
  title: string;
  data: any;
  icon: React.JSX.Element;
  colors: {
    stroke: string;
    fill: string;
  };
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  icon,
  colors,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `+ ${calc}%` : `- ${calc}%`;
  const textColor = total > trend ? "seagreen" : "crimson";

  return (
    <div
      className="stat my-2 py-4 flex-1 bg-zinc-50 border-l-4 rounded"
      style={{ borderColor: colors?.stroke }}
    >
      <div
        className="stat-figure text-secondary"
        style={{ color: colors?.fill }}
      >
        {icon}
      </div>
      <div className="stat-title text-l">{title}</div>
      <div className="stat-value" style={{ color: colors?.stroke }}>
        {formatTotal(total ?? "...")}
      </div>
      <div className="stat-desc my-2">
        <span className="mx-1 text-l font-bold" style={{ color: textColor }}>
          {percent}
        </span>
        since last week
      </div>
    </div>
  );
};
