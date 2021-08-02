import { Form, Input } from 'antd';
export default function Step1() {
  return (
    <Form.Item
      label="E-mail"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>
  );
}
