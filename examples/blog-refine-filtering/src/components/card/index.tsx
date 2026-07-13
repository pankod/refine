import styles from "./index.module.css";

import { motion } from "framer-motion";

export const Card = ({ title, status }: { title: string; status: string }) => {
  return (
    <motion.div
      className={styles.wrapper}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={styles.circle}
        style={{
          borderColor: `${
            status === "draft"
              ? "gold"
              : status === "rejected"
                ? "tomato"
                : "limegreen"
          }`,
        }}
      />
      <h3 className={styles.title}>{title}</h3>
    </motion.div>
  );
};
