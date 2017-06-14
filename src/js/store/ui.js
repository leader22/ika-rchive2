// @flow
import BaseStore from './base';


class UiStore extends BaseStore {
  isModalOpen: boolean;

  constructor(key: string) {
    super(key, {
      isModalOpen: false,
    });
  }

  setModalOpen(bool: boolean): void {
    this.isModalOpen = bool;
  }
}

export default UiStore;
