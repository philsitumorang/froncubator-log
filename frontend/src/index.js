import { Row, Col, Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './index.scss';
import Filter from './components/filter/filter';
import { Provider } from "./state/useGlobalState";
import reducer from './state/reducer';
import Main from './pages/main/main';
import './index.scss';

const { Sider, Content } = Layout;
const initialState = {
  logs: [],
  stats: null
};

function Index(props) {
  return (
    <div className="main">
      <Provider reducer={reducer} initialState={initialState}>
        <Layout>
          <Sider className="sider">
            <Filter />
          </Sider>
          <Content>
            <Router>
              <Switch>
                <Route exact path="/" component={Main} />
              </Switch>
            </Router>
          </Content>
        </Layout>
      </Provider>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
