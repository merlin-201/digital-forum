import React from 'react'
import ReactDOM from 'react-dom'

import App from './App';


/* ------------------------------- redux ------------------------------ */
import { createStore, applyMiddleware } from "redux"

import { composeWithDevTools } from "redux-devtools-extension"

/* ------------------------------- reat-redux ------------------------------- */
import { Provider } from 'react-redux';

/* ------------------------------- allReducers ------------------------------ */
import allReducers from './reducers';

/* ---------------------------------- thunk --------------------------------- */
import thunk from "redux-thunk"


const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)) );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
