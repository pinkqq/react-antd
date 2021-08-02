import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchUser } from '../store/action/table';

function Detail(props) {
  const { userId } = useParams();
  const { byId, fetchUserPending, fetchUser } = props;
  const user = byId ? byId[userId] : null;

  useEffect(() => {
    if (!user) fetchUser(userId);
    // eslint-disable-next-line
  }, []);

  if (!user || fetchUserPending) return 'loading...';
  const { first_name, last_name } = user;

  return (
    <div className="detail-page">
      <Link to="/table">Back to list</Link>
      <ul>
        <li>
          <label>First name:</label>
          <span>{first_name}</span>
        </li>
        <li>
          <label>Last name:</label>
          <span>{last_name}</span>
        </li>
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.table,
  };
}

const mapDispatchToProps = { fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
