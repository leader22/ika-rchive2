// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import Store from './store';

// eslint-disable-next-line
const ver = __VERSION__;
// eslint-disable-next-line
const isDev = __DEV__;


// 環境チェック第一
try {
  localStorage.setItem('IA2_TEST', 'TEST');
  localStorage.removeItem('IA2_TEST');
} catch(err) {
  // TODO:
  location.href = './sorry.html';
}
// なんかあったらもう逃がす
window.onerror = err => {
  err; debugger;
  // TODO:
  location.href = './sorry.html';
};

// 常連の方
if (typeof localStorage.getItem('IA2_USER') === 'string') {
  const store = new Store(ver, localStorage);
  if (isDev) { window.store = store; }

  const App = () => <div>ArchiveApp!</div>;
  ReactDOM.render(
    <Provider
      {...store}
    >
      <App />
    </Provider>,
    document.getElementById('jsApp')
  );
}
// はじめての方
else {
  const $start = document.getElementById('jsStartApp');
  if ($start instanceof HTMLElement) {
    $start.addEventListener('click', () => {
      localStorage.setItem('IA2_USER', JSON.stringify({ ver }));
      location.reload(true);
    }, false);
  }
}
