import { MoreOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

export const TableActionButton = ({ onClick }: Props) => {
  const { styles } = useStyles();
  return (
    <MoreOutlined
      role="button"
      className={styles.button}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    />
  );
};
