// @flow
import { bindThis } from '../util';

import type ModLogStore from '../store/mod-log';


class ModLogEvent {
  _store: ModLogStore;

  constructor(store: ModLogStore) {
    bindThis(this);

    this._store = store;
  }

  onChangeModLog(key: string, valObj: Object): void {
    this._store.update(key, valObj);
  }
}

export default ModLogEvent;
