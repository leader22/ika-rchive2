// @flow
import {
  extendObservable,
} from 'mobx';


class UserStore {
  ver: string;

  constructor(data: UserStore) {
    extendObservable(this, {
      ver: data.ver,
    });
  }

  migrate(nextVer: string): void {
    this.ver = nextVer;
  }
}

export default UserStore;
