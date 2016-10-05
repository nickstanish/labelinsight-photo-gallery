require('sass/styles.scss');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store/store'
import AppRouter from './AppRouter'



render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('bind-node')
);