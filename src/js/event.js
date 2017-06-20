// @flow
import { reaction } from 'mobx';
import { bindThis } from './util';

import type Store from './store';
import type UiStore from './store/ui';
import type UserStore from './store/user';
import type RecordStore from './store/record';

import debug from './util/debug';

// TODO: mock
const storage = localStorage;


class Event {
  ui: UiStore;
  user: UserStore;
  record: RecordStore;

  constructor({
    ui,
    user,
    record,
  }: Store) {
    bindThis(this);

    this.ui = ui;
    this.user = user;
    this.record = record;

    reaction(
      () => this.ui.isModalOpen,
      isOpen => {
        window.ontouchmove = isOpen ? ev => { ev.preventDefault(); } : () => {};
      }
    );
  }

  onChangeTab(idx: number): void {
    this.user.setVisibleTab(idx);
  }

  onClickOpenAddLogModal(): void {
    this.ui.setAddLogModalOpen(true);
  }
  onClickCloseAddLogModal(): void {
    this.ui.setAddLogModalOpen(false);
  }

  onClickAddLog(log: LogSeed): void {
    this.record.add(log);
    this.user.updateLastRankAndPoint(log);
  }

  onClickOpenModLogModal(log: Log): void {
    this.ui.setModLog(log);
  }
  onChangeModLog(item: Object): void {
    this.ui.updateModLog(item);
  }
  onClickModLog(): void {
    this.record.mod(this.ui.modLog);
    this.ui.setModLog(null);
  }
  onClickCloseModLogModal(): void {
    this.ui.setModLog(null);
  }

  onClickDelLog(log: Log): void {
    // const check = window.confirm('TODO: 取り消せません');
    // if (check) {
      this.record.del(log);
    // }
  }

  onClickLogShowMore(): void {
    this.ui.logShowMore();
  }

  onClickResetAll(): void {
    // const check = window.confirm('TODO: 取り消せません');
    // if (check) {
      storage.clear();
      location.reload(true);
    // }
  }

  // TODO: あとでけす
  onClickDebug1() { debug.addAreaRecord(100); }
  onClickDebug2() { debug.addYaguraRecord(500); }
  onClickDebug3() { debug.addHokoRecord(10); }
}

export default Event;
