// @flow
import { extendObservable } from 'mobx';


class UiStore {
  isAddLogModalOpen: boolean;
  isModLogModalOpen: boolean;

  constructor() {
    extendObservable(this, {
      isAddLogModalOpen: false,
      isModLogModalOpen: false,
    });
  }

  setAddLogModalOpen(bool: boolean): void {
    this.isAddLogModalOpen = bool;
  }

  setModLogModalOpen(bool: boolean): void {
    this.isModLogModalOpen = bool;
  }
}

export default UiStore;
