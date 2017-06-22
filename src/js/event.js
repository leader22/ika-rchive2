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
import type UserStore from './store/user';
import type RecordStore from './store/record';


class Event {
  ui: UiStore;
  user: UserStore;
  record: RecordStore;
  debug: Debug;

  constructor(
    {
      ui,
      user,
      record,
    }: Store,
    debug: Debug,
  ) {
    bindThis(this);

    this.ui = ui;
    this.user = user;
    this.record = record;

    this.debug = debug;

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
