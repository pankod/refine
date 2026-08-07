import { useSimpleList } from "@refinedev/antd";
import { List, Skeleton } from "antd";

import { CanvasTile } from "../../components/canvas";
import { SponsorsBanner } from "../../components/banners";
import type { Canvas } from "../../types";

export const CanvasFeaturedList: React.FC = () => {
  const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
    { listProps, query: queryResult } = useSimpleList<Canvas>({
      resource: "canvases",
      pagination: {
        pageSize: 12,
      },
      sorters: {
        initial: [
          {
            field: "created_at",
            order: "desc",
          },
        ],
      },
      filters: {
        initial: [
          {
            field: "is_featured",
            operator: "eq",
            value: true,
          },
        ],
      },
    });

  const { isLoading } = queryResult;

  return (
    <div className="container">
      <div className="paper">
        {isLoading ? (
          <div className="canvas-skeleton-list">
            {[...Array(12)].map((_, index) => (
              <Skeleton key={index} paragraph={{ rows: 8 }} />
            ))}
          </div>
        ) : (
          <List
            {...listProps}
            className="canvas-list"
            split={false}
            renderItem={(canvas) => <CanvasTile canvas={canvas} />}
          />
        )}
      </div>
      <SponsorsBanner />
    </div>
  );
};
