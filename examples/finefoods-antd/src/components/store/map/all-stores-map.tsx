import { useList, useNavigation, useTranslate } from "@refinedev/core";
import { Map, AdvancedMarker } from "../../map";
import type { IStore } from "../../../interfaces";
import { Card, Flex, List, Tag, Typography } from "antd";
import { useRef, useState } from "react";
import {
  CheckCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BasicMarker } from "../../icons";

export const AllStoresMap = () => {
  const t = useTranslate();
  const parentRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [selectedStore, setSelectedStore] = useState<IStore | null>(null);

  const { edit } = useNavigation();

  const { result: storeData } = useList<IStore>({
    resource: "stores",
    pagination: {
      mode: "off",
    },
  });
  const stores = storeData?.data || [];

  const handleMarkerClick = (e: any, store: IStore) => {
    setSelectedStore(store);
  };

  return (
    <Flex
      ref={parentRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Map
        mapProps={{
          setMap,
          mapId: "all-stores-map",
          disableDefaultUI: true,
          center: {
            lat: 40.73061,
            lng: -73.935242,
          },
          zoom: 10,
        }}
      >
        {stores?.map((store) => {
          const lat = Number(store.address?.coordinate?.[0]);
          const lng = Number(store.address?.coordinate?.[1]);

          if (!lat || !lng) return null;

          return (
            <AdvancedMarker
              key={store.id}
              map={map}
              zIndex={selectedStore?.id === store.id ? 1 : 0}
              position={{
                lat,
                lng,
              }}
              onClick={(e: any) => {
                handleMarkerClick(e, store);
              }}
            >
              {(selectedStore?.id !== store.id || !selectedStore) && (
                <img src="/images/marker-store.svg" alt={store.title} />
              )}
              {selectedStore?.id === store.id && (
                <Card
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStore(null);
                  }}
                  style={{
                    position: "relative",
                    marginBottom: "16px",
                  }}
                  styles={{
                    body: {
                      padding: "16px",
                    },
                  }}
                >
                  <Flex align="center" justify="space-between" gap={32}>
                    <Typography.Title
                      level={5}
                      onClick={() => {
                        edit("stores", selectedStore.id);
                      }}
                      style={{
                        cursor: "pointer",
                        fontWeight: "400",
                        marginBottom: "0px",
                      }}
                    >
                      {selectedStore.title}
                    </Typography.Title>
                    <Tag
                      color={selectedStore.isActive ? "green" : "default"}
                      style={{
                        color: selectedStore.isActive ? "green" : "#00000073",
                        marginInlineEnd: 0,
                      }}
                      icon={
                        selectedStore.isActive ? (
                          <CheckCircleOutlined />
                        ) : (
                          <StopOutlined />
                        )
                      }
                    >
                      <Typography.Text
                        style={{
                          color: selectedStore.isActive
                            ? "#3C8618"
                            : "00000073",
                        }}
                      >
                        {t(`stores.fields.isActive.${selectedStore.isActive}`)}
                      </Typography.Text>
                    </Tag>
                  </Flex>
                  <List
                    dataSource={[
                      {
                        title: <EnvironmentOutlined />,
                        value: selectedStore.address.text,
                      },
                      {
                        title: <UserOutlined />,
                        value: selectedStore.email,
                      },
                      {
                        title: <PhoneOutlined />,
                        value: selectedStore.gsm,
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <Flex gap={8}>
                          <Typography.Text type="secondary">
                            {item.title}
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            {item.value}
                          </Typography.Text>
                        </Flex>
                      </List.Item>
                    )}
                  />
                  <BasicMarker
                    style={{
                      color: "white",
                      position: "absolute",
                      bottom: "-16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                </Card>
              )}
            </AdvancedMarker>
          );
        })}
      </Map>
    </Flex>
  );
};
