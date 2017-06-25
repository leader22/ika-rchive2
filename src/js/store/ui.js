// @flow
import {
  computed,
  extendObservable,
} from 'mobx';


class UiStore {
  isAddLogModalOpen: boolean;
  isModLogModalOpen: boolean;
  isHelpModalOpen: boolean;
  isScrollPrevented: boolean;
  logPage: number;

  constructor() {
    extendObservable(this, {
      // formの要素が競合しないために、それぞれ必要
      isAddLogModalOpen: false,
      isModLogModalOpen: false,
      isHelpModalOpen: false,

      isScrollPrevented: computed(() => {
        return this.isAddLogModalOpen || this.isModLogModalOpen || this.isHelpModalOpen;
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
  setHelpModalOpen(bool: boolean): void {
    this.isHelpModalOpen = bool;
  }

  logShowMore(): void {
    this.logPage++;
  }
}

export default UiStore;
