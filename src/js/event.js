// @flow
import { bindThis } from './util';

import type Store from './store';
import type UiStore from './store/ui';
import type RecordStore from './store/record';

// TODO: mock
const storage = localStorage;


class Event {
  ui: UiStore;
  record1: RecordStore;
  record2: RecordStore;
  record3: RecordStore;

  constructor({
    ui,
    record1,
    record2,
    record3,
  }: Store) {
    bindThis(this);

    this.ui = ui;
    this.record1 = record1;
    this.record2 = record2;
    this.record3 = record3;
  }

  onClickOpenAddLogModal(): void {
    this.ui.setAddLogModalOpen(true);
  }
  onClickCloseAddLogModal(): void {
    this.ui.setAddLogModalOpen(false);
  }

  onClickAddLog(log: LogSeed): void {
    if (log.mode === 1) {
      this.record1.add(log);
    }
    if (log.mode === 2) {
      this.record2.add(log);
    }
    if (log.mode === 3) {
      this.record3.add(log);
    }
  }

  onClickModLog(log: Log): void {
    console.log(log);
    this.ui.setModLogModalOpen(true);
  }
  onClickCloseModLogModal(): void {
    this.ui.setModLogModalOpen(false);
  }

  onClickResetAll(): void {
    const check = window.confirm('TODO: 取り消せません');
    if (check) {
      storage.clear();
      location.reload(true);
    }
  }
}

export default Event;
