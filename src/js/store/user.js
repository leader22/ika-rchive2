// @flow
import {
  extendObservable,
} from 'mobx';


class User {
  ver: string;

  constructor(data: User) {
    extendObservable(this, {
      ver: data.ver,
    });
  }

  migrate(nextVer: string): void {
    this.ver = nextVer;
  }
}

export default User;
