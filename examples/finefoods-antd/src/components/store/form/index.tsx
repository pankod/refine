import { Col, Row, Spin } from "antd";
import { StoreMap } from "../map";
import { useStoreForm } from "./useStoreForm";
import { StoreFormFields } from "./fields";
import type { UseFormProps } from "@refinedev/antd";
import { StoreCourierTable } from "../courier-table";

type Props = {
  action: UseFormProps["action"];
};

export const StoreForm = (props: Props) => {
  const {
    store,
    handleMapOnDragEnd,
    formProps,
    saveButtonProps,
    handleAddressChange,
    formLoading,
    isFormDisabled,
    setIsFormDisabled,
    latLng,
  } = useStoreForm({
    action: props.action,
  });

  return (
    <Spin spinning={formLoading}>
      <Row gutter={16} wrap>
        <Col xs={24} md={12} lg={9}>
          <StoreFormFields
            formProps={formProps}
            saveButtonProps={saveButtonProps}
            action={props.action}
            isFormDisabled={isFormDisabled}
            setIsFormDisabled={setIsFormDisabled}
            handleAddressChange={handleAddressChange}
          />
        </Col>
        <Col
          xs={24}
          md={12}
          lg={15}
          style={{
            height: props.action === "create" ? "calc(100vh - 300px)" : "432px",
            marginTop: "64px",
          }}
        >
          <StoreMap
            lat={latLng?.lat}
            lng={latLng?.lng}
            zoom={props.action === "create" ? 4 : 10}
            store={store}
            isDisabled={isFormDisabled}
            onDragEnd={handleMapOnDragEnd}
          />
        </Col>
        <Col
          xs={24}
          sm={{
            span: 24,
            offset: 0,
          }}
          lg={{
            span: 15,
            offset: 9,
          }}
        >
          {props.action === "edit" && (
            <div
              style={{
                marginTop: "16px",
              }}
            >
              <StoreCourierTable store={store} />
            </div>
          )}
        </Col>
      </Row>
    </Spin>
  );
};
