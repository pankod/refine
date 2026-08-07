import Rating from "@mui/material/Rating";
import type { ICourier, IReview } from "../../../interfaces";
import { useList } from "@refinedev/core";

type Props = {
  courier?: ICourier;
};

export const CourierRating = (props: Props) => {
  const { result: data } = useList<IReview>({
    resource: "reviews",
    filters: [
      {
        field: "order.courier.id",
        operator: "eq",
        value: props.courier?.id,
      },
    ],
    pagination: {
      mode: "off",
    },
    queryOptions: {
      enabled: !!props.courier?.id,
    },
  });

  const review = data?.data || [];
  const totalStarCount = review?.reduce(
    (acc, curr) => acc + (curr?.star || 0),
    0,
  );
  const avgStar = totalStarCount / (review?.length || 1);

  return (
    <Rating name="courier-rating" value={avgStar} precision={0.5} readOnly />
  );
};
