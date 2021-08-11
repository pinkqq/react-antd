import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Loadable from 'react-loadable';
import Table from './pages/table';
import Detail from './pages/detail';
import Step from './pages/step';
import './App.css';

function Loading() {
  return <div>Loading...</div>;
}

const AsyncLogin = Loadable({
  loader: () => import('./pages/login'), // oh no!
  loading: Loading,
});

const routers = [
  {
    name: 'Suspense',
    path: '/suspense',
    loader: () => import('./pages/suspense'),
  },
  {
    name: 'Form',
    path: '/form',
    loader: () => import('./pages/form'),
  },
  {
    name: 'DynamicForm',
    path: '/dynamic-form',
    loader: () => import('./pages/dynamicForm'),
  },
  {
    name: 'Multiple Request',
    path: '/multiple-request',
    loader: () => import('./pages/multipleRequest'),
  },
  {
    name: 'Multiple Request Async',
    path: '/multiple-request-async',
    loader: () => import('./pages/multipleRequestAsync'),
  },
  {
    name: 'Resize Layout',
    path: '/resize-layout',
    loader: () => import('./pages/resizeLayout'),
  },
  {
    name: 'Dialog',
    path: '/dialog',
    loader: () => import('./pages/dialog'),
  },
  {
    name: 'D3Class',
    path: '/d3-class',
    loader: () => import('./pages/d3/class'),
  },
  {
    name: 'D3Func',
    path: '/d3-func',
    loader: () => import('./pages/d3/func'),
  },
  {
    name: 'DragDrop',
    path: '/drag-drop',
    loader: () => import('./pages/dragDrop'),
  },
  {
    name: 'Dnd',
    path: '/dnd',
    loader: () => import('./pages/dnd'),
  },
  {
    name: 'DndPro',
    path: '/dnd-pro',
    loader: () => import('./pages/dndPro'),
  },
  {
    name: 'Home',
    path: '/',
    loader: () => import('./pages/index'),
  },
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
              <AsyncLogin />
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
            {routers.map(({ path, loader }) => {
              const Component = Loadable({
                loader,
                loading: Loading,
              });
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
