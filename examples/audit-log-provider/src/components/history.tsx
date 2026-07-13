import type { FC } from "react";
import { type BaseKey, useLogList } from "@refinedev/core";

import type { ILog } from "../interfaces";

type HistoryProps = {
  resource: string;
  id?: BaseKey;
};

export const History: FC<HistoryProps> = ({ resource, id }) => {
  const { isLoading, data } = useLogList<ILog[]>({
    resource,
    meta: {
      id,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>History #{id}</h2>
      {data?.length === 0 && <div>No history</div>}
      {data?.map((item) => (
        <div key={item.id}>
          <div>Resource: {item.resource}</div>
          <div>Action: {item.action}</div>
          <div>
            Data:
            <pre>{JSON.stringify(item.data, null, 2)}</pre>
          </div>
          <div>
            Previous Data:
            <pre>{JSON.stringify(item.previousData, null, 2)}</pre>
          </div>
          <div>Timestamp: {item.timestamp}</div>
        </div>
      ))}
    </div>
  );
};
