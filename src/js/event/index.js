// @flow
import { reaction } from 'mobx';

import {
  bindThis,
  getGlobal,
} from '../util';
import UserEvent from './user';
import UiEvent from './ui';
import RecordEvent from './record';
import AddLogEvent from './add-log';
import ModLogEvent from './mod-log';

const window = getGlobal();

import type Debug from '../util/debug';
import type Store from '../store';


class Event {
  ui: UiEvent;
  user: UserEvent;
  addLog: AddLogEvent;
  modLog: ModLogEvent;
  record: RecordEvent;
  _store: Store;
  _debug: Debug;

  constructor(
    store: Store,
    debug: Debug,
  ) {
    bindThis(this);

    this._store = store;
    this._debug = debug;

    this.ui = new UiEvent(store.ui);
    this.user = new UserEvent(store.user);
    this.record = new RecordEvent(store.record);
    this.addLog = new AddLogEvent(store.addLog);
    this.modLog = new ModLogEvent(store.modLog);
  }

  onBoot(): void {
    const { addLog, record, ui } = this._store;

    addLog.copyLastRankAndPoint(record.lastRankAndPoint);

    reaction(
      () => ui.isScrollPrevented,
      isOpen => {
        window.ontouchmove = isOpen ? ev => { ev.preventDefault(); } : () => {};
      }
    );

    // 最後にキロクしたウデマエを復元
    reaction(
      () => `${addLog.mode}-${String(ui.isAddLogModalOpen)}`,
      () => {
        addLog.applyLastRankAndPoint(record.lastRankAndPoint);
      }
    );
  }

  onClickAddLog(): Promise<*> {
    const { record, addLog } = this._store;
    return record.add(addLog.asSeed);
  }

  onClickOpenModLogModal(log: Log): void {
    const { ui, modLog } = this._store;
    ui.setModLogModalOpen(true);
    modLog.init(log);
  }
  onClickModLog(): Promise<*> {
    const { record, modLog } = this._store;
    return record.mod(modLog.asLog);
  }

  onClickResetAll(): void {
    const check = window.confirm('この操作は取り消せません。\n本当に削除しますか？');
    if (check) {
      window.localStorage.clear();
      window.location.reload(true);
    }
  }

  // TODO: あとでけす
  onClickDebug1() { this._debug.addAreaRecord(100); window.alert('つくったよ'); }
  onClickDebug2() { this._debug.addYaguraRecord(500); window.alert('つくったよ'); }
  onClickDebug3() { this._debug.addHokoRecord(10); window.alert('つくったよ'); }
}

export default Event;
