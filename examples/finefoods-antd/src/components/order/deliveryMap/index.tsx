import type { IOrder } from "../../../interfaces";
import { Map, MapMarker } from "../../map";

type Props = {
  order?: IOrder;
};

export const OrderDeliveryMap = ({ order }: Props) => {
  return (
    <Map
      mapProps={{
        center: {
          lat: 40.73061,
          lng: -73.935242,
        },
        zoom: 9,
      }}
    >
      <MapMarker
        key={`user-marker-${order?.user.id}`}
        icon={{
          url: "/images/marker-customer.svg",
        }}
        position={{
          lat: Number(order?.adress.coordinate[0]),
          lng: Number(order?.adress.coordinate[1]),
        }}
      />
      <MapMarker
        key={`user-marker-${order?.user.id}`}
        icon={{
          url: "/images/marker-courier.svg",
        }}
        position={{
          lat: Number(order?.store.address.coordinate[0]),
          lng: Number(order?.store.address.coordinate[1]),
        }}
      />
    </Map>
  );
};
