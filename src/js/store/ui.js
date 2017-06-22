// @flow
import {
  computed,
  extendObservable,
  runInAction,
  toJS,
} from 'mobx';

import {
  isValidLogSeed,
} from '../util';


class UiStore {
  isAddLogModalOpen: boolean;
  isModLogModalOpen: boolean;
  isModalOpen: boolean;
  modLog: Log;
  canModLog: boolean;
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
      modLog: {},
      canModLog: true,
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
      this.canModLog = true;
    });
  }

  updateModLog(item: Object): void {
    Object.assign(this.modLog, item);
    // XXX: 本当はcomputedにしたい
    // ただし、modLogをmapにせず楽に更新する以上やむなし
    this.canModLog = isValidLogSeed(this.modLog);
  }

  logShowMore(): void {
    this.logPage++;
  }
}

export default UiStore;
