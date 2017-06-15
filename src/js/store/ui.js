// @flow
import { extendObservable } from 'mobx';


class UiStore {
  isModalOpen: boolean;

  constructor() {
    extendObservable(this, {
      isModalOpen: false,
    });
  }

  setModalOpen(bool: boolean): void {
    this.isModalOpen = bool;
  }
}

export default UiStore;
