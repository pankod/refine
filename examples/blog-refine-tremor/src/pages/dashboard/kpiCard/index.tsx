import {
  Card,
  Text,
  Metric,
  Flex,
  ProgressBar,
  BadgeDelta,
  type DeltaType,
} from "@tremor/react";

const getDeltaType = (trend: number): DeltaType => {
  if (trend < -35) return "decrease";
  if (trend < 0) return "moderateDecrease";
  if (trend === 0) return "unchanged";
  if (trend < 30) return "moderateIncrease";
  return "increase";
};

export const KpiCard = ({
  title,
  total,
  trend,
  target,
  percentage,
}: {
  title: string;
  total: string;
  trend: number;
  target: string;
  percentage: number;
}) => {
  return (
    <Card className="max-w-lg">
      <Flex alignItems="start">
        <div>
          <Text>{title}</Text>
          <Metric>{total}</Metric>
        </div>
        <BadgeDelta deltaType={getDeltaType(trend)}>{`${trend}%`}</BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">{`${percentage}% (${total})`}</Text>
        <Text>{`Target(${target})`}</Text>
      </Flex>
      <ProgressBar value={percentage} className="mt-2" />
    </Card>
  );
};
