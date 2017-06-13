// @flow
import {
  extendObservable,
} from 'mobx';


class UserStore {
  version: string;
  initRate: number;

  constructor(data: UserStore) {
    extendObservable(this, {
      version: data.version,
      initRate: data.initRate,
    });
  }

  migrate(nextVer: string): void {
    this.version = nextVer;
  }
}

export default UserStore;
