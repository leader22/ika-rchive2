// @flow
import { bindThis } from './util';

import type Store from './store';
import type UiStore from './store/ui';
import type RecordStore from './store/record';


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

  onClickOpenInputPage(): void {
    this.ui.setModalOpen(true);
  }
  onClickCloseInputPage(): void {
    this.ui.setModalOpen(false);
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
}

export default Event;
