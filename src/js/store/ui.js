// @flow
import {
  computed,
  extendObservable,
} from 'mobx';


class UiStore {
  isAddLogModalOpen: boolean;
  isModLogModalOpen: boolean;
  isModalOpen: boolean;
  logPage: number;

  constructor() {
    extendObservable(this, {
      // formの要素が競合しないために、それぞれ必要
      isAddLogModalOpen: false,
      isModLogModalOpen: false,
      // 見た目的には同時に開かないけど
      isModalOpen: computed(() => {
        return this.isAddLogModalOpen || this.isModLogModalOpen;
      }),
      logPage: 1,
    });
  }

  setAddLogModalOpen(bool: boolean): void {
    this.isAddLogModalOpen = bool;
  }
  setModLogModalOpen(bool: boolean): void {
    this.isModLogModalOpen = bool;
  }

  logShowMore(): void {
    this.logPage++;
  }
}

export default UiStore;
