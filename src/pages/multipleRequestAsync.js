import { useState, useEffect } from 'react';
import { Form, Select, Input } from 'antd';

const { Option } = Select;

const fetchUserInfo = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userName: 'Nate',
        province: 'shanghai',
        city: 'pudong',
      });
    }, 2000);
  });
};

const fetchProvices = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { name: '北京', key: 'beijing' },
        { name: '上海', key: 'shanghai' },
        { name: '江苏', key: 'jiangsu' },
        { name: '山东', key: 'shandong' },
      ]);
    }, 2000);
  });
};

const fetchCities = (province) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        {
          beijing: [
            { name: '朝阳', key: 'chaoyang' },
            { name: '海淀', key: 'haidian' },
          ],
          shanghai: [
            { name: '浦东', key: 'pudong' },
            { name: '徐汇', key: 'xuhui' },
          ],
          jiangsu: [
            { name: '南京', key: 'nanjing' },
            { name: '苏州', key: 'suzhou' },
          ],
          shandong: [
            { name: '青岛', key: 'qingdao' },
            { name: '德州', key: 'dezhou' },
          ],
        }[province],
      );
    }, 2000);
  });
};

export default function MultipleRequestAsync(props) {
  const [userInfo, setUserInfo] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    async function getData() {
      const info = await fetchUserInfo();
      setUserInfo(info);
      const provinces = await fetchProvices();
      setProvinces(provinces);
      const cities = await fetchCities(info.province);
      setCities(cities);
      form.setFieldsValue(info);
    }
    getData();
    // eslint-disable-next-line
  }, []);

  const handleProvinceChange = async (newProvince) => {
    form.setFieldsValue({ city: 'loading' });
    const cities = await fetchCities(newProvince);
    setCities(cities);
    form.setFieldsValue({ city: cities[0].key });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ province: 'loading...', city: 'loading...' }}
    >
      <Form.Item label="姓名：" name="userName">
        <Input placeholder="user name" value={userInfo.userName} />
      </Form.Item>
      <Form.Item label="Province：" name="province">
        <Select style={{ width: 120 }} onChange={handleProvinceChange}>
          {provinces.length ? (
            provinces.map((provinces) => (
              <Option key={provinces.key} value={provinces.key}>
                {provinces.name}
              </Option>
            ))
          ) : (
            <Option value="loading">loading...</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item label="City：" name="city">
        <Select style={{ width: 120 }}>
          {cities.length ? (
            cities.map((city) => (
              <Option key={city.key} value={city.key}>
                {city.name}
              </Option>
            ))
          ) : (
            <Option value="loading">loading...</Option>
          )}
        </Select>
      </Form.Item>
    </Form>
  );
}
