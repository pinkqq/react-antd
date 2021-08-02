import { Form, Input, DatePicker } from 'antd';
export default function Step2() {
  return (
    <div>
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="生日" name="birthday">
        <DatePicker />
      </Form.Item>
    </div>
  );
}
