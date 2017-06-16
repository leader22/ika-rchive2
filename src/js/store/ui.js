// @flow
import {
  extendObservable,
  runInAction,
  toJS,
} from 'mobx';


class UiStore {
  isAddLogModalOpen: boolean;
  modLog: Log;
  isModLogModalOpen: boolean;
  logPage: number;

  constructor() {
    extendObservable(this, {
      isAddLogModalOpen: false,
      modLog: {},
      isModLogModalOpen: false,
      logPage: 1,
    });
  }

  setAddLogModalOpen(bool: boolean): void {
    this.isAddLogModalOpen = bool;
  }

  setModLog(log: Log | null): void {
    if (log === null) {
      this.isModLogModalOpen = false;
      return;
    }
    runInAction(() => {
      this.isModLogModalOpen = true;
      extendObservable(this.modLog, toJS(log));
    });
  }

  updateModLog(item: Object): void {
    Object.assign(this.modLog, item);
  }

  logShowMore(): void {
    this.logPage++;
  }
}

export default UiStore;
