import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Input, Table } from 'antd';
import { fetchList, fetchUser } from '../store/action/table';

const { Search } = Input;

const { Column, ColumnGroup } = Table;

const TablePage = (props) => {
  let history = useHistory();
  const { page: routerPage } = useParams();
  const [search, setSearch] = useState('');

  const {
    items,
    fetchList,
    fetchListError,
    fetchListPending,
    page,
    total,
    pageSize,
    listNeedReload,
    dataSource,
  } = props;

  useEffect(() => {
    const initPage = routerPage || 1;
    // 页码变化 || 未拉取过数据 || 需要 reload
    if (page !== initPage || !dataSource.length || listNeedReload)
      fetchList(parseInt(initPage, 10));
    // eslint-disable-next-line
  }, []);

  if (fetchListError) {
    return <div>{fetchListError.error.message}</div>;
  }

  if (!items || !items.length) return 'loading...';

  const handlePageChange = (newPage) => {
    history.push(`/table/${newPage}`);
    fetchList(newPage);
  };

  const handleSearch = (keyword) => {
    fetchList(page, pageSize, keyword);
  };

  return (
    <div>
      <Search
        placeholder="Search..."
        style={{ width: '200px' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />
      <Table
        dataSource={dataSource}
        style={{ width: '800px', margin: '50px auto' }}
        rowKey="id"
        loading={fetchListPending}
        pagination={{
          current: page,
          onChange: handlePageChange,
          total: total,
          pageSize: pageSize,
        }}
      >
        <Column
          title="ID"
          dataIndex="id"
          key="id"
          render={(id) => <Link to={`/user/${id}`}>{id}</Link>}
        />
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="first_name" key="first_name" />
          <Column title="Last Name" dataIndex="last_name" key="last_name" />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email" />
      </Table>
    </div>
  );
};

const getItems = (state) => state.items;
const getById = (state) => state.byId;

const dataSourceSelector = createSelector(getItems, getById, (items, byId) => {
  console.log('reselect: get data sourc!');
  if (!items) return [];
  return items.map((id) => byId[id]);
});

const mapStateToProps = function (state) {
  return {
    ...state.table,
    dataSource: dataSourceSelector(state.table),
  };
};
const mapDispatchToProps = { fetchList, fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
