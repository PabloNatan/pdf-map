import { useContext } from "react";
import { Modal, Form, Select, message, Input } from "antd";
import { ElementDispatchContext } from "../../hooks/ElementContext";
import {
  SELECT_TYPE_OPTIONS,
  INITIAL_FORM_VALUES,
  handleSelectedType,
} from "./constants";

export default function CreateModal({ visible, toggleVisible }) {
  const [form] = Form.useForm();

  const { addElement } = useContext(ElementDispatchContext);

  const handleSubmit = (values) => {
    addElement({
      ...handleSelectedType(values.type),
      fieldName: values.fieldName,
    });
    toggleVisible();
  };

  return (
    <Modal
      title="Create Element"
      visible={visible}
      onOk={() => form.submit()}
      onCancel={toggleVisible}
      okText="Create"
    >
      <Form
        form={form}
        initialValues={INITIAL_FORM_VALUES}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Field Name"
          name="fieldName"
          validateTrigger="onSubmit"
          rules={[{ required: true, message: "Please input field name!" }]}
        >
          <Input name="fieldName" type="text" />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please input the type!" }]}
        >
          <Select options={SELECT_TYPE_OPTIONS} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}
