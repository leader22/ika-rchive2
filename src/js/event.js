// @flow
import { reaction } from 'mobx';
import {
  bindThis,
  getGlobal,
} from './util';

const window = getGlobal();

import type Debug from './util/debug';
import type Store from './store';
import type UiStore from './store/ui';
import type AddLogStore from './store/add-log';
import type ModLogStore from './store/mod-log';
import type UserStore from './store/user';
import type RecordStore from './store/record';


class Event {
  ui: UiStore;
  addLog: AddLogStore;
  modLog: ModLogStore;
  user: UserStore;
  record: RecordStore;
  debug: Debug;

  constructor(
    {
      ui,
      addLog,
      modLog,
      user,
      record,
    }: Store,
    debug: Debug,
  ) {
    bindThis(this);

    this.ui = ui;
    this.addLog = addLog;
    this.modLog = modLog;
    this.user = user;
    this.record = record;

    this.debug = debug;
  }

  onBoot(): void {
    reaction(
      () => this.ui.isModalOpen,
      isOpen => {
        window.ontouchmove = isOpen ? ev => { ev.preventDefault(); } : () => {};
      }
    );

    // 最後にキロクしたウデマエを復元
    reaction(
      () => `${this.addLog.mode}-${String(this.ui.isAddLogModalOpen)}`,
      () => {
        this.addLog.applyLastRankAndPoint(this.record.lastRankAndPoint);
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

  onChangeAddLog(key: string, valObj: Object): void {
    this.addLog.update(key, valObj);
  }
  onClickAddLog(): void {
    this.record.add(this.addLog.asSeed);
  }

  onClickOpenModLogModal(log: Log): void {
    this.ui.setModLogModalOpen(true);
    this.modLog.init(log);
  }
  onChangeModLog(key: string, valObj: Object): void {
    this.modLog.update(key, valObj);
  }
  onClickModLog(): void {
    this.record.mod(this.modLog.asLog);
    this.ui.setModLogModalOpen(false);
  }
  onClickCloseModLogModal(): void {
    this.ui.setModLogModalOpen(false);
  }

  onClickDelLog(log: Log): void {
    const check = window.confirm('この操作は取り消せません。\n本当に削除しますか？');
    if (check) {
      this.record.del(log);
    }
  }

  onClickLogShowMore(): void {
    this.ui.logShowMore();
  }

  onClickResetAll(): void {
    const check = window.confirm('この操作は取り消せません。\n本当に削除しますか？');
    if (check) {
      window.localStorage.clear();
      window.location.reload(true);
    }
  }

  // TODO: あとでけす
  onClickDebug1() { this.debug.addAreaRecord(100); window.alert('つくったよ'); }
  onClickDebug2() { this.debug.addYaguraRecord(500); window.alert('つくったよ'); }
  onClickDebug3() { this.debug.addHokoRecord(10); window.alert('つくったよ'); }
}

export default Event;
