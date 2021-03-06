// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import Debug from './util/debug';
import Store from './store';
import Event from './event';
import App from './component/app';

// eslint-disable-next-line
const ver = __VERSION__;
// eslint-disable-next-line
const isDev = __DEV__;


// 環境チェック第一
try {
  localStorage.setItem('IA2_TEST', 'TEST');
  localStorage.removeItem('IA2_TEST');
} catch(err) {
  location.href = './sorry.html';
}
// なんかあったらもう逃がす
window.onerror = err => {
  console.error(err);
  location.href = './sorry.html';
};

// ログが多いとLocalStorageからの取得に時間がかかって下の画面見える
// なので隠しておく
const $body = document.getElementById('jsApp');

// 常連の方
if (typeof localStorage.getItem('IA2_USER') === 'string') {
  const store = new Store(ver);
  const debug = new Debug(store);
  const event = new Event(store, debug);

  if (isDev) {
    window.store = store;
    window.event = event;
    window.debug = debug;
  }

  event.onBoot();

  ReactDOM.render(
    <Provider
      {...store}
      event={event}
    >
      <App />
    </Provider>,
    $body
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

// ここまでの処理は全て同期なので、準備完了で見せる
if ($body) {
  $body.className = 'body';
}
