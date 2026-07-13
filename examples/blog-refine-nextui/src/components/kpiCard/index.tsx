import { Progress, Card, Chip, Spinner } from "@nextui-org/react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
type DeltaType =
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "danger";

const getColor = (num: number): DeltaType => {
  if (num < 20) return "danger";
  if (num < 50) return "warning";
  if (num === 50) return "default";
  if (num < 75) return "primary";
  if (num < 90) return "secondary";
  return "success";
};

const calcPercent = (num: number, den: number): number => {
  return Math.round((num / den) * 100);
};

export const KpiCard = ({
  title,
  total,
  target,
  trend,
  formattedTotal,
  formattedTarget,
}: {
  title: string;
  total: number;
  target: number;
  trend: number;
  formattedTotal: string;
  formattedTarget: string;
}) => {
  const percent = calcPercent(trend, total);
  const color = getColor(percent);
  return (
    <Card className="p-5">
      <div>
        <div className="flex justify-between mb-10">
          <div>
            <p>{title}</p>
            <h1 className="text-lg font-bold">{formattedTotal}</h1>
          </div>
          {Number.isNaN(Number(percent)) ? (
            <Spinner />
          ) : (
            <Chip
              color={color}
              startContent={
                percent < 0 ? (
                  <ArrowDownIcon width={12} />
                ) : (
                  <ArrowUpIcon width={12} />
                )
              }
            >
              {`${percent}%`}
            </Chip>
          )}
        </div>
        <Progress
          label={`${formattedTotal} (Target: ${formattedTarget})`}
          size="sm"
          value={total}
          maxValue={target}
          color={color}
          showValueLabel={true}
          className="max-w-md"
        />
      </div>
    </Card>
  );
};
