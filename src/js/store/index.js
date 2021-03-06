// @flow
import RecordStore from './record';
import UserStore from './user';
import UiStore from './ui';
import AddLogStore from './add-log';
import ModLogStore from './mod-log';


class Store {
  ui: UiStore;
  user: UserStore;
  record: RecordStore;
  addLog: AddLogStore;
  modLog: ModLogStore;

  constructor(ver: string) {
    this.ui = new UiStore();
    this.addLog = new AddLogStore();
    this.modLog = new ModLogStore();
    this.user = new UserStore('IA2_USER');
    this.record = new RecordStore('IA2_RECORD');

    if (this.user.ver !== ver) {
      console.warn(`migrate from ${this.user.ver} to ${ver}`);
      this.user.ver = ver;
    }
  }
}

export default Store;
