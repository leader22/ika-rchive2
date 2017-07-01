// @flow
import { bindThis } from '../util';

import type RecordStore from '../store/record';


class RecordEvent {
  _store: RecordStore;

  constructor(store: RecordStore) {
    bindThis(this);

    this._store = store;
  }

  onClickDelLog(log: Log): void {
    const check = window.confirm('この操作は取り消せません。\n本当に削除しますか？');
    if (check) {
      this._store.del(log);
    }
  }
}

export default RecordEvent;
