// @flow
import {
  extendObservable,
} from 'mobx';


class UiStore {
  isModalOpen: boolean;

  constructor() {
    extendObservable(this, {
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
