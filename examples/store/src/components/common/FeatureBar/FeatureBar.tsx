import cn from "clsx";
import s from "./FeatureBar.module.css";

interface FeatureBarProps {
  className?: string;
  title: string;
  description?: string;
  hide?: boolean;
  action?: React.ReactNode;
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  className,
  action,
  hide,
}) => {
  const rootClassName = cn(
    s.root,
    {
      transform: true,
      "translate-y-0 opacity-100": !hide,
      "translate-y-full opacity-0": hide,
    },
    className,
  );
  return (
    <div className={rootClassName}>
      <span className="block md:inline">{title}</span>
      <span className="mb-6 block md:mb-0 md:ml-2 md:inline">
        {description}
      </span>
      {action && action}
    </div>
  );
};

export default FeatureBar;
