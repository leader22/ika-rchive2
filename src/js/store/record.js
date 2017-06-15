// @flow
import StorageStore from '../util/storage-store';

import type { IObservableArray } from 'mobx';


class RecordStore extends StorageStore {
  items: IObservableArray<Log>;

  constructor(key: string) {
    super(key, {
      items: [],
    });
  }

  add(seed: LogSeed): void {
    const log = Object.assign({}, seed);
    delete log.mode;
    log.id = Date.now();
    this.items.splice(0, 0, log);
  }
}

export default RecordStore;
