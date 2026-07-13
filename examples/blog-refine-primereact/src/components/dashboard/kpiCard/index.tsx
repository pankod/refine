import { Card } from "primereact/card";

type KpiCardProps = {
  title: string;
  total: number;
  trend: number;
  icon: string;
  color: string;
  formatTotal?: (value: number) => number | string;
};

export const KpiCard = ({
  title,
  color,
  total,
  trend,
  icon,
  formatTotal = (value) => value,
}: KpiCardProps) => {
  const renderTrend = () => {
    const calc = Math.round((trend / total) * 100);

    if (total < trend) {
      return (
        <div className="text-green-500">
          <span className="font-medium mr-2">+{calc}%</span>
        </div>
      );
    }

    return (
      <div className="text-pink-500">
        <span className="font-medium mr-2">-{calc}%</span>
      </div>
    );
  };

  return (
    <Card
      className={`shadow-1 border-left-3 border-${color}`}
      title={
        <div className="flex justify-content-between">
          <div>
            <span className="block font-bold text-xl mb-3">{title}</span>
            <div className="text-900 font-medium text-2xl">
              {formatTotal(total)}
            </div>
          </div>
          <div
            className="flex align-items-center justify-content-center"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <i className={`pi ${icon} text-${color} text-2xl`} />
          </div>
        </div>
      }
    >
      <div className="flex">
        {renderTrend()}
        <span className="text-500">since last week</span>
      </div>
    </Card>
  );
};
