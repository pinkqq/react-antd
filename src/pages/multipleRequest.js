import { useState, useEffect } from 'react';
import { Form, Select, Input } from 'antd';

const { Option } = Select;

const fetchUserInfo = () => {
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

export default function MultipleRequest(props) {
  const [userInfo, setUserInfo] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserInfo()
      .then((info) => {
        setUserInfo(info);
        return fetchCities(info.province);
      })
      .then((cities) => {
        setCities(cities);
      });
    fetchProvices().then((provinces) => {
      setProvinces(provinces);
    });
  }, []);
  const handleProvinceChange = (newProvince) => {
    console.log(newProvince);
    setCities([]);
    fetchCities(newProvince).then((cities) => {
      setCities(cities);
      form.setFieldsValue({ city: cities[0].name });
    });
  };
  return (
    <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Form.Item label="姓名：">
        <Input placeholder="user name" value={userInfo.userName} name="name" />
      </Form.Item>
      <Form.Item label="Province：">
        {provinces.length ? (
          <Select
            defaultValue={userInfo.province || provinces[0].name}
            style={{ width: 120 }}
            name="province"
            onChange={handleProvinceChange}
          >
            {provinces.map((provinces) => (
              <Option key={provinces.key} value={provinces.key}>
                {provinces.name}
              </Option>
            ))}
          </Select>
        ) : (
          <SelectLoading />
        )}
      </Form.Item>
      <Form.Item label="City：">
        {cities.length ? (
          <Select
            defaultValue={userInfo.city || cities[0].name}
            style={{ width: 120 }}
            name="city"
          >
            {cities.map((city) => (
              <Option key={city.key} value={city.key}>
                {city.name}
              </Option>
            ))}
          </Select>
        ) : (
          <SelectLoading />
        )}
      </Form.Item>
    </Form>
  );
}

function SelectLoading() {
  return (
    <Select defaultValue="loading...">
      <Option value="loading">loading...</Option>
    </Select>
  );
}
