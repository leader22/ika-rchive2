// @flow
import {
  reaction,
  toJS,
} from 'mobx';

import RecordStore from './store/record';
import UserStore from './store/user';
import UiStore from './store/ui';


class Store {
  _storage: Storage;
  ui: UiStore;
  user: UserStore;
  record: RecordStore;

  constructor(ver: string, storage: Storage) {
    this._storage = storage;

    // ここにくる = userは存在する（が、Flowのために文字列をデフォルトでいれる）
    const userData = this._storage.getItem('IA2_USER') || '{}';
    // recordはない場合もあるので、その場合は空配列にする
    const recordData = this._storage.getItem('IA2_RECORD') || '[]';

    this.ui = new UiStore();
    this.user = new UserStore(JSON.parse(userData));
    this.record = new RecordStore(JSON.parse(recordData));

    // TODO: パフォーマンスみてから
    reaction(
      () => toJS(this.user),
      data => storage.setItem('IA2_USER', JSON.stringify(data))
    );
    reaction(
      () => toJS(this.record),
      data => storage.setItem('IA2_RECORD', JSON.stringify(data))
    );

    if (this.user.ver !== ver) {
      console.warn(`migrate from ${this.user.ver} to ${ver}`);

      this.user.migrate(ver);
      this.record.migrate(ver);
    }
  }

  reset(): void {
    this._storage.clear();
  }
}

export default Store;
