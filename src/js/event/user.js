// @flow
import { bindThis } from '../util';

import type UserStore from '../store/user';


class UserEvent {
  _store: UserStore;

  constructor(store: UserStore) {
    bindThis(this);

    this._store = store;
  }

  onChangeTab(idx: number): void {
    this._store.setVisibleTab(idx);
  }
}

export default UserEvent;
