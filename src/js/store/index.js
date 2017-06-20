// @flow
import RecordStore from './record';
import UserStore from './user';
import UiStore from './ui';


class Store {
  ui: UiStore;
  user: UserStore;
  record: RecordStore;

  constructor(ver: string) {
    this.ui = new UiStore();
    this.user = new UserStore('IA2_USER');
    this.record = new RecordStore('IA2_RECORD');

    if (this.user.ver !== ver) {
      console.warn(`migrate from ${this.user.ver} to ${ver}`);
      this.user.ver = ver;
    }
  }
}

export default Store;
