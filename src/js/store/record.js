// @flow
import {
  extendObservable,
} from 'mobx';

import type { IObservableArray } from 'mobx';


class RecordStore {
  items: IObservableArray<Log>;

  constructor(record: Record) {
    extendObservable(this, {
      items: record,
    });
  }

  migrate(nextVer: string): void {
    nextVer;
  }

  add(): void {
    console.log('add');
  }
}

export default RecordStore;
