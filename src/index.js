import 'semantic-ui-css/semantic.min.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/App.js';

const store = createStore(reducers, applyMiddleware(thunk));

console.log(process.env);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);