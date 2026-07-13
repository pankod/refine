import React, { type FC, type PropsWithChildren, type ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  label?: ReactNode;
};

const Tooltip: FC<PropsWithChildren<Props>> = ({ label, children }) => {
  if (!label) return <>{children}</>;

  return (
    <div className={`refine-tooltip ${styles.tooltip} group/prop-tooltip`}>
      {children}
      <div
        className={`refine-tooltip-content ${styles.tooltipContainer} group-hover/prop-tooltip:visible`}
      >
        <span className={styles.tooltipContent}>{label}</span>
        <div className={styles.tooltipArrow} />
      </div>
    </div>
  );
};

export default Tooltip;
