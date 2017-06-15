// @flow
import StorageStore from '../util/storage-store';


class UserStore extends StorageStore {
  ver: string;

  constructor(key: string) {
    super(key, {
      ver: '',
    });
  }
}

export default UserStore;
