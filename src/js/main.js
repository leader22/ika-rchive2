// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import setting from './setting';
import Store from './store';
import Event from './event';
import App from './component/app';
import Entry from './component/entry';

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

// TODO: 下の画面見えるやつ

// 常連の方
if (typeof localStorage.getItem('IA2_USER') === 'string') {
  const store = new Store(ver, localStorage);
  const event = new Event(store);

  if (isDev) {
    window.store = store;
    window.event = event;
  }

  ReactDOM.render(
    <Provider
      {...store}
      event={event}
      setting={setting}
    >
      <App />
    </Provider>,
    document.getElementById('jsApp')
  );
}
// はじめての方
else {
  ReactDOM.render(
    <Provider
      setting={setting}
    >
      <Entry
        onClickEntry={rate => {
          localStorage.setItem('IA2_USER', JSON.stringify({
            version: ver,
            initRate: rate,
          }));
          location.reload(true);
        }}
      />
    </Provider>,
    document.getElementById('jsEntry')
  );
}
