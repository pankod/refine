import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import {
  Form,
  type FormProps,
  Input,
  Modal,
  type ModalProps,
  Radio,
} from "antd";

import { getRandomName, DEFAULT_CANVAS_SIZE } from "../../utility";
import type { User } from "../../types";

type CreateCanvasProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const CreateCanvas: React.FC<CreateCanvasProps> = ({
  modalProps,
  formProps,
}) => {
  const { data: user } = useGetIdentity<User | null>();

  const [values, setValues] = useState(() => {
    const name = getRandomName();
    return {
      name: name,
      id: name.replace(/\s/g, "-").toLowerCase(),
      width: DEFAULT_CANVAS_SIZE,
      height: DEFAULT_CANVAS_SIZE,
    };
  });

  return (
    <Modal
      {...modalProps}
      title="Create Canvas"
      width={600}
      centered
      afterClose={() => {
        const name = getRandomName();
        setValues({
          name: name,
          id: name.replace(/\s/g, "-").toLowerCase(),
          width: DEFAULT_CANVAS_SIZE,
          height: DEFAULT_CANVAS_SIZE,
        });
      }}
      bodyStyle={{ borderRadius: "6px" }}
    >
      <Form
        {...formProps}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={() => {
          return formProps.onFinish?.({
            ...values,
            user_id: user?.id,
          });
        }}
      >
        <Form.Item label="ID:">
          <Input value={values.id} disabled />
        </Form.Item>

        <Form.Item label="Name:">
          <Input value={values.name} disabled />
        </Form.Item>

        <Form.Item label="Size:">
          <Radio.Group
            options={[10, 20, 30]}
            onChange={({ target: { value } }) =>
              setValues((p) => ({
                ...p,
                height: value,
                width: value,
              }))
            }
            value={values.width}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
