import { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const DynamicForm = () => {
  const [form] = Form.useForm();
  const [jobs, setJobs] = useState([]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setJobs(['engineer', 'student', 'doctor']);
    }, 2000);
    return function clear() {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Form form={form} {...layout}>
      <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="job" label="Job" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Option key={job} value={job}>
                {job}
              </Option>
            ))
          ) : (
            <Option>loading</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.job !== currentValues.job
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('job') !== 'student' ? (
            <Form.Item
              name="income"
              label="Income"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
