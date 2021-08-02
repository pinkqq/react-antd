import './style.css';

export default function Step3(props) {
  const { email, username, birthday } = props.form.getFieldsValue(true);
  return (
    <div className="finish-step">
      <ul>
        <li>
          <label>Email:</label>
          <span>{email}</span>
        </li>
        <li>
          <label>用户名:</label>
          <span>{username}</span>
        </li>
        <li>
          <label>生日:</label>
          <span>{birthday ? birthday.format('M月D日') : ''}</span>
        </li>
      </ul>
    </div>
  );
}
