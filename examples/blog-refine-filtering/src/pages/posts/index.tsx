import { useState } from "react";
import { useMany } from "@refinedev/core";
import { motion, AnimatePresence } from "framer-motion";

import { Filter } from "../../components/filter";
import { Search } from "../../components/search";
import { Card } from "../../components/card";

import styles from "./index.module.css";

export const Posts = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const posts = useMany<{
    id: number;
    title: string;
    status: string;
  }>({
    resource: "posts",
    ids: Array.from(Array(8).keys()).slice(1),
  }).data?.data;

  const filters: string[] = ["published", "draft", "rejected"];

  return (
    <motion.div>
      <div className={styles.filters}>
        {filters.map((filter, index) => {
          return (
            <Filter
              key={index}
              title={filter}
              isActive={filter === activeFilter}
              onClick={(e: React.MouseEvent) => {
                const el = e.target as HTMLElement;
                el.textContent?.toLowerCase() !== activeFilter
                  ? setActiveFilter(filter)
                  : setActiveFilter("");
              }}
            />
          );
        })}
      </div>
      <Search
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />
      <AnimatePresence>
        {posts
          ?.filter((el) =>
            el.title.toLowerCase().includes(inputValue.toLowerCase()),
          )
          .filter((e) => e.status.includes(activeFilter))
          .map((post: { title: string; status: string }, index: number) => {
            return <Card key={index} title={post.title} status={post.status} />;
          })}
      </AnimatePresence>
    </motion.div>
  );
};
