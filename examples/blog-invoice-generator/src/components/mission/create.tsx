import {
  Form,
  Input,
  type ModalProps,
  type FormProps,
  Modal,
  InputNumber,
} from "antd";

type CreateMissionProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const CreateMission: React.FC<CreateMissionProps> = ({
  modalProps,
  formProps,
}) => {
  return (
    <Modal {...modalProps} title="Create Contact">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="mission"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="mission_description">
          <Input />
        </Form.Item>
        <Form.Item label="Day(s)" name="day">
          <InputNumber defaultValue={1} />
        </Form.Item>
        <Form.Item label="Daily Rate" name="daily_rate">
          <InputNumber defaultValue={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
