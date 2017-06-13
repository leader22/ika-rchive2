// @flow
import {
  computed,
  extendObservable,
} from 'mobx';

import type { IObservableArray } from 'mobx';

type Log = {|
  +mode: number,
  +stage: number,
  +result: boolean,
  +rate: number,
|};
export type Record = Array<Log>;


class RecordStore {
  items: IObservableArray<Log>;

  constructor(record: Record) {
    extendObservable(this, {
      items: record,
      hasRecord: computed(() => {
        return this.items.length !== 0;
      }),
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
