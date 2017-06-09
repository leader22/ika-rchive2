// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import { extendObservable } from 'mobx';

// eslint-disable-next-line
const ver = __VERSION__;

class Store {
  foo: number;

  constructor() {
    extendObservable(this, {
      foo: 1,
    });
  }
}

const store = new Store();

console.log(ver, store.foo);

ReactDOM.render(
  <h1>Hello, world! -> {store.foo}</h1>,
  document.getElementById('jsApp')
);
