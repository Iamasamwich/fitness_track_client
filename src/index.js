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

console.log('from client.... NODE_ENV', process.env.NODE_ENV);
console.log('from client.... HOST', process.env.HOST);
console.log('from client.... PORT', process.env.PORT);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);