// @flow
import { extendObservable, observable } from 'mobx';


class UiStore {
  modLog: Log | null;
  isAddLogModalOpen: boolean;
  isModLogModalOpen: boolean;

  constructor() {
    extendObservable(this, {
      modLog: observable.ref(null),
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

  setModLog(log: Log) {
    this.modLog = log;
  }
}

export default UiStore;
