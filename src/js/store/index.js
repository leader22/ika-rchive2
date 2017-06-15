// @flow
import RecordStore from './record';
import UserStore from './user';
import UiStore from './ui';


class Store {
  ui: UiStore;
  user: UserStore;
  record1: RecordStore;
  record2: RecordStore;
  record3: RecordStore;

  constructor(ver: string) {
    this.user = new UserStore('IA2_USER');
    this.ui = new UiStore();
    this.record1 = new RecordStore('IA2_RECORD_AREA');
    this.record2 = new RecordStore('IA2_RECORD_YAGURA');
    this.record3 = new RecordStore('IA2_RECORD_HOKO');

    if (this.user.ver !== ver) {
      console.warn(`migrate from ${this.user.ver} to ${ver}`);
      this.user.ver = ver;
    }
  }
}

export default Store;
