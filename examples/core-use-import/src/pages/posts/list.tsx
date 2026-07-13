import React from "react";
import { useImport } from "@refinedev/core";

export const DummyList: React.FC = () => {
  const [total, setTotal] = React.useState(0);
  const [processed, setProcessed] = React.useState(0);

  const { handleChange } = useImport<IPostFile>({
    onFinish: (results) => {
      window.alert(JSON.stringify(results));
    },
    onProgress: ({ totalAmount, processedAmount }) => {
      setProcessed(processedAmount);
      setTotal(totalAmount);
    },
  });

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            handleChange({
              file: event.target.files[0],
            });
          }
        }}
      />
      <br />
      <span>{`${processed}/${total}`}</span>
    </>
  );
};

interface IPostFile {
  title: string;
  categoryId: string;
}
