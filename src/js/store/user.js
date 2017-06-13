// @flow
import BaseStore from './base';


class UserStore extends BaseStore {
  ver: string;

  constructor(key: string) {
    super(key, {
      ver: '',
    });
  }
}

export default UserStore;
