// @flow
import BaseStore from './base';

import type { IObservableArray } from 'mobx';


class RecordStore extends BaseStore {
  items: IObservableArray<Log>;

  constructor(key: string) {
    super(key, {
      items: [],
    });
  }

  add(): void {
    console.log('add');
  }
}

export default RecordStore;
