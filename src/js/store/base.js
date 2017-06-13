// @flow
import {
  extendObservable,
  reaction,
  toJS,
} from 'mobx';
// TODO: mock
const storage = localStorage;


class BaseStore {
  data: Object;

  constructor(key: string, data: Object) {
    const stored = storage.getItem(key);
    if (typeof stored === 'string') {
      extendObservable(this, JSON.parse(stored));
    }
    else {
      extendObservable(this, data);
    }

    // 永続化しなくていいのもある
    if (key === '_') {
      return;
    }
    reaction(
      () => toJS(this),
      data => storage.setItem(key, JSON.stringify(data))
    );
  }
}

export default BaseStore;
