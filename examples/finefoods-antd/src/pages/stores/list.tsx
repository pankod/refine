import { CreateButton, List } from "@refinedev/antd";

import { AllStoresMap, StoreListTable } from "../../components";
import { Flex, Segmented } from "antd";
import { useState } from "react";
import { useTranslate } from "@refinedev/core";
import { EnvironmentOutlined, UnorderedListOutlined } from "@ant-design/icons";

type View = "table" | "map";

export const StoreList = () => {
  const [view, setView] = useState<View>(
    (localStorage.getItem("store-view") as View) || "table",
  );

  const handleViewChange = (value: View) => {
    setView(value);
    localStorage.setItem("store-view", value);
  };

  const t = useTranslate();

  return (
    <>
      <List
        breadcrumb={false}
        headerButtons={(props) => [
          <Segmented<View>
            key="view"
            size="large"
            value={view}
            style={{ marginRight: 24 }}
            options={[
              {
                label: "",
                value: "table",
                icon: <UnorderedListOutlined />,
              },
              {
                label: "",
                value: "map",
                icon: <EnvironmentOutlined />,
              },
            ]}
            onChange={handleViewChange}
          />,
          <CreateButton {...props.createButtonProps} key="create" size="large">
            {t("stores.addNewStore")}
          </CreateButton>,
        ]}
      >
        {view === "table" && <StoreListTable />}
        {view === "map" && (
          <Flex
            style={{
              height: "calc(100dvh - 232px)",
              marginTop: "32px",
            }}
          >
            <AllStoresMap />
          </Flex>
        )}
      </List>
    </>
  );
};
