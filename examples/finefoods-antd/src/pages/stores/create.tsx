import { useTranslate } from "@refinedev/core";
import { ListButton } from "@refinedev/antd";
import { Flex, Divider } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { StoreForm } from "../../components";

export const StoreCreate = () => {
  const t = useTranslate();

  return (
    <>
      <Flex>
        <ListButton icon={<LeftOutlined />}>{t("stores.stores")}</ListButton>
      </Flex>
      <Divider />
      <StoreForm action="create" />
    </>
  );
};
