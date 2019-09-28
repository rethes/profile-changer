// react libraries
import React from 'react';
import ReactDOM from 'react-dom';

// third party libraries
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider as ReduxQueryProvider } from "redux-query-react";

//components
import './styles/css/index.css';
import { store, getQueries } from './store';
import Routes from "./routes";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
      <Routes/>
      </ReduxQueryProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
