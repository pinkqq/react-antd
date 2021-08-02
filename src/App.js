import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Home from './pages/index';
import Login from './pages/login';
import Form from './pages/form';
import DynamicForm from './pages/dynamicForm';
import Table from './pages/table';
import Detail from './pages/detail';
import MultipleRequest from './pages/multipleRequest';
import MultipleRequestAsync from './pages/multipleRequestAsync';
import Step from './pages/step';
import ResizeLayout from './pages/resizeLayout';
import Dialog from './pages/dialog';
import D3Class from './pages/d3/class';
import D3Func from './pages/d3/func';
import './App.css';

function App(props) {
  const { loggedIn } = props;
  const selectedKeys = window.location.pathname.replace(/^\//, '').split('/');
  return (
    <div className="App">
      <Router>
        {/* 路由切换 ⬇️ */}
        <Menu mode="horizontal" defaultSelectedKeys={selectedKeys}>
          <Menu.Item key="">
            <Link to="/">Home</Link>
          </Menu.Item>
          {!loggedIn ? (
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          ) : null}
          <Menu.Item key="form">
            <Link to="/form">Form</Link>
          </Menu.Item>
          <Menu.Item key="dynamic-form">
            <Link to="/dynamic-form">Dynamic Form</Link>
          </Menu.Item>
          <Menu.Item key="table">
            <Link to="/table">Table</Link>
          </Menu.Item>
          <Menu.Item key="multiple-request">
            <Link to="/multiple-request">Multiple Request</Link>
          </Menu.Item>
          <Menu.Item key="multiple-request-async">
            <Link to="/multiple-request-async">Multiple Request Async</Link>
          </Menu.Item>
          <Menu.Item key="step">
            <Link to="/step/1">Step</Link>
          </Menu.Item>
          <Menu.Item key="resize-layout">
            <Link to="/resize-layout">Resize Layout</Link>
          </Menu.Item>
          <Menu.Item key="dialog">
            <Link to="/dialog">Dialog</Link>
          </Menu.Item>
          <Menu.Item key="d3-class">
            <Link to="/d3-class">D3Class</Link>
          </Menu.Item>
          <Menu.Item key="d3-func">
            <Link to="/d3-func">D3Func</Link>
          </Menu.Item>
        </Menu>
        {/* 路由匹配列表 ⬇️ */}
        <div style={{ padding: '50px' }}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/form">
              <Form />
            </Route>
            <Route path="/dynamic-form">
              <DynamicForm />
            </Route>
            <Route path="/table/:page?">
              <Table />
            </Route>
            <Route path="/user/:userId">
              <Detail />
            </Route>
            <Route path="/multiple-request">
              <MultipleRequest />
            </Route>
            <Route path="/multiple-request-async">
              <MultipleRequestAsync />
            </Route>
            <Redirect exact from="/step" to="/step/1" />
            <Route path="/step">
              <Step />
            </Route>
            <Route path="/resize-layout">
              <ResizeLayout />
            </Route>
            <Route path="/dialog">
              <Dialog />
            </Route>
            <Route path="/d3-class">
              <D3Class />
            </Route>
            <Route path="/d3-func">
              <D3Func />
            </Route>
            <Route path="/">
              <Home />
            </Route>
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
