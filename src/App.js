import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Login from './pages/login';
import Table from './pages/table';
import Detail from './pages/detail';
import Step from './pages/step';
import './App.css';

const routers = [
  {
    name: 'Form',
    path: '/form',
    component: require('./pages/form'),
  },
  {
    name: 'DynamicForm',
    path: '/dynamic-form',
    component: require('./pages/dynamicForm'),
  },
  {
    name: 'Multiple Request',
    path: '/multiple-request',
    component: require('./pages/multipleRequest'),
  },
  {
    name: 'Multiple Request Async',
    path: '/multiple-request-async',
    component: require('./pages/multipleRequest'),
  },
  {
    name: 'Resize Layout',
    path: '/resize-layout',
    component: require('./pages/resizeLayout'),
  },
  {
    name: 'Dialog',
    path: '/dialog',
    component: require('./pages/dialog'),
  },
  {
    name: 'D3Class',
    path: '/d3-class',
    component: require('./pages/d3/class'),
  },
  {
    name: 'D3Func',
    path: '/d3-func',
    component: require('./pages/d3/func'),
  },
  {
    name: 'DragDrop',
    path: '/drag-drop',
    component: require('./pages/dragDrop'),
  },
  {
    name: 'Dnd',
    path: '/dnd',
    component: require('./pages/dnd'),
  },
  {
    name: 'DndPro',
    path: '/dnd-pro',
    component: require('./pages/dndPro'),
  },
  { name: 'Home', path: '/', component: require('./pages/index') },
];
function App(props) {
  const { loggedIn } = props;
  const selectedKeys = window.location.pathname.replace(/^\//, '').split('/');
  return (
    <div className="App">
      <Router>
        {/* 路由切换 ⬇️ */}
        <Menu mode="horizontal" defaultSelectedKeys={selectedKeys}>
          {!loggedIn ? (
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          ) : null}
          {routers.map(({ path, name }) => (
            <Menu.Item key={path.slice(1)}>
              <Link to={path}>{name}</Link>
            </Menu.Item>
          ))}
          <Menu.Item key="table">
            <Link to="/table">Table</Link>
          </Menu.Item>
          <Menu.Item key="step">
            <Link to="/step/1">Step</Link>
          </Menu.Item>
        </Menu>
        {/* 路由匹配列表 ⬇️ */}
        <div style={{ padding: '50px' }}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/table/:page?">
              <Table />
            </Route>
            <Route path="/user/:userId">
              <Detail />
            </Route>
            <Redirect exact from="/step" to="/step/1" />
            <Route path="/step">
              <Step />
            </Route>
            {routers.map(({ path, component }) => {
              const Component = component.default;
              return (
                <Route key={path} path={path}>
                  <Component />
                </Route>
              );
            })}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.login.loggedIn,
  };
}

export default connect(mapStateToProps)(App);
