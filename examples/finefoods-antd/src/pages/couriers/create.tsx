import { useTranslate, useGetToPath, useGo } from "@refinedev/core";
import {
  SaveButton,
  useStepsForm,
  useSelect,
  type UseFormReturnType,
} from "@refinedev/antd";
import {
  Form,
  Select,
  Input,
  Button,
  Steps,
  type InputProps,
  Modal,
  Flex,
  theme,
} from "antd";
import InputMask from "react-input-mask";
import type { ICourier, IStore, IVehicle } from "../../interfaces";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { CourierFormItemAvatar } from "../../components";

export const CourierCreate = () => {
  const t = useTranslate();
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();
  const { token } = theme.useToken();

  const { current, gotoStep, stepsProps, formProps, saveButtonProps } =
    useStepsForm<ICourier>();

  const { formList } = useFormList({ formProps });

  const handleModalClose = () => {
    go({
      to:
        searchParams.get("to") ??
        getToPath({
          action: "list",
        }) ??
        "",
      query: {
        to: undefined,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const isLastStep = current === formList.length - 1;
  const isFirstStep = current === 0;

  return (
    <Modal
      open
      destroyOnClose
      maskClosable={false}
      title={t("couriers.actions.add")}
      styles={{
        header: {
          padding: "20px 24px",
          margin: 0,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        },
        footer: {
          padding: "20px 24px",
          margin: 0,
          borderTop: `1px solid ${token.colorBorderSecondary}`,
        },
        content: {
          padding: 0,
        },
      }}
      footer={() => {
        return (
          <Flex align="center" justify="space-between">
            <Button onClick={handleModalClose}>{t("buttons.cancel")}</Button>
            <Flex align="center" gap={16}>
              <Button
                disabled={isFirstStep}
                onClick={() => {
                  gotoStep(current - 1);
                }}
              >
                {t("buttons.previousStep")}
              </Button>
              {isLastStep ? (
                <SaveButton icon={false} {...saveButtonProps} />
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    gotoStep(current + 1);
                  }}
                >
                  {t("buttons.nextStep")}
                </Button>
              )}
            </Flex>
          </Flex>
        );
      }}
      onCancel={handleModalClose}
    >
      <Flex style={{ padding: "20px 24px" }}>
        <Steps {...stepsProps} responsive>
          <Steps.Step title={t("couriers.steps.personal")} />
          <Steps.Step title={t("couriers.steps.company")} />
          <Steps.Step title={t("couriers.steps.vehicle")} />
        </Steps>
      </Flex>
      <Form {...formProps} layout="vertical">
        {formList[current]}
      </Form>
    </Modal>
  );
};

type UseFormListProps = {
  formProps: UseFormReturnType<ICourier>["formProps"];
};

const useFormList = (props: UseFormListProps) => {
  const t = useTranslate();

  const { selectProps: storeSelectProps } = useSelect<IStore>({
    resource: "stores",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: vehicleSelectProps } = useSelect<IVehicle>({
    resource: "vehicles",
    optionLabel: "model",
    optionValue: "id",

    pagination: {
      mode: "server",
    },
  });

  const formList = useMemo(() => {
    const step1 = (
      <Flex
        key="personal"
        vertical
        style={{
          padding: "20px 24px",
        }}
      >
        <CourierFormItemAvatar
          formProps={props.formProps}
          showUploadOverlay={false}
          containerStyle={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Form.Item
          label={t("couriers.fields.name.label")}
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={t("couriers.fields.name.placeholder")} />
        </Form.Item>
        <Form.Item
          label={t("couriers.fields.email.label")}
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input placeholder={t("couriers.fields.email.placeholder")} />
        </Form.Item>
        <Form.Item
          label={t("couriers.fields.gsm.label")}
          name="gsm"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputMask mask="(999) 999 99 99">
            {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
            {(props: InputProps) => (
              <Input
                {...props}
                placeholder={t("couriers.fields.gsm.placeholder")}
              />
            )}
          </InputMask>
        </Form.Item>
        <Form.Item
          label={t("couriers.fields.address.label")}
          name="address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea
            rows={2}
            placeholder={t("couriers.fields.address.placeholder")}
          />
        </Form.Item>
      </Flex>
    );

    const step2 = (
      <Flex
        key="company"
        vertical
        style={{
          padding: "20px 24px",
        }}
      >
        <Form.Item
          label={t("couriers.fields.store.label")}
          name={["store", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...storeSelectProps}
            placeholder={t("couriers.fields.store.placeholder")}
          />
        </Form.Item>
        <Form.Item
          label={t("couriers.fields.accountNumber.label")}
          name="accountNumber"
          rules={[
            {
              required: true,
              len: 10,
            },
          ]}
        >
          <Input placeholder={t("couriers.fields.accountNumber.placeholder")} />
        </Form.Item>
      </Flex>
    );

    const step3 = (
      <Flex
        key="company"
        vertical
        style={{
          padding: "20px 24px",
        }}
      >
        <Form.Item
          label={t("couriers.fields.vehicle.label")}
          name={["vehicle", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...vehicleSelectProps}
            placeholder={t("couriers.fields.vehicle.placeholder")}
          />
        </Form.Item>
        <Form.Item
          label={t("couriers.fields.licensePlate.label")}
          name="licensePlate"
          rules={[
            {
              required: true,
              pattern: /^[A-Z]{3}\s\d{3}$/,
              message: t("couriers.fields.licensePlate.patternMessage"),
            },
          ]}
        >
          <Input placeholder={t("couriers.fields.licensePlate.placeholder")} />
        </Form.Item>
      </Flex>
    );

    return [step1, step2, step3];
  }, [props.formProps]);

  return { formList };
};
