import React                                     from 'react';
import ReactDOM                                  from 'react-dom';
import { BrowserRouter }                         from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import App                                       from './App';
import * as serviceWorker                        from './serviceWorker';
import { /*applyMiddleware,*/ createStore, /*compose*/ } from "redux";
import { Provider }                              from 'react-redux';
import reducer                                   from "./store/reducers/reducer";

/* eslint-disable no-underscore-dangle */
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
//   applyMiddleware(...middleware)
// ));

const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
