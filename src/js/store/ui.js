// @flow
import BaseStore from './base';


class UiStore extends BaseStore {
  isModalOpen: boolean;

  constructor(key: string) {
    super(key, {
      // TODO: debug
      // isModalOpen: false,
      isModalOpen: true,
    });
  }

  setModalOpen(bool: boolean): void {
    this.isModalOpen = bool;
  }
}

export default UiStore;
