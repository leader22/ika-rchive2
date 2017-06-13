// @flow
import RecordStore from './store/record';
import UserStore from './store/user';
import UiStore from './store/ui';


class Store {
  _storage: Storage;
  ui: UiStore;
  user: UserStore;
  record1: RecordStore;
  record2: RecordStore;
  record3: RecordStore;

  constructor(ver: string) {
    this.user = new UserStore('IA2_USER');
    this.ui = new UiStore('_');
    this.record1 = new RecordStore('IA2_RECORD_AREA');
    this.record2 = new RecordStore('IA2_RECORD_YAGURA');
    this.record3 = new RecordStore('IA2_RECORD_HOKO');

    if (this.user.ver !== ver) {
      console.warn(`migrate from ${this.user.ver} to ${ver}`);
      this.user.ver = ver;
    }
  }

  reset(): void {
    // this._storage.clear();
  }
}

export default Store;
