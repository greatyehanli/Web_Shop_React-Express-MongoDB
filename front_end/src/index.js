//核心模块
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

//组件
import App from './App';

//css
import './index.css';

//redux
import store from './redux/store'

//pass store for redux, browserrouter for routing
ReactDOM.render(
  <BrowserRouter>
    <Provider store = {store}>
      <App/>
    </Provider>
  </BrowserRouter>
,
  document.getElementById('root')
)
