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
    <Modal {...modalProps} title="Create Mission">
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
        <Form.Item initialValue={1} label="Day(s)" name="day">
          <InputNumber />
        </Form.Item>
        <Form.Item initialValue={1} label="Daily Rate" name="daily_rate">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};
