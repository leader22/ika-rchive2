// @flow
import { bindThis } from '../util';

import type AddLogStore from '../store/add-log';


class AddLogEvent {
  _store: AddLogStore;

  constructor(store: AddLogStore) {
    bindThis(this);

    this._store = store;
  }

  onChangeAddLog(key: string, valObj: Object): void {
    this._store.update(key, valObj);
  }
}

export default AddLogEvent;
