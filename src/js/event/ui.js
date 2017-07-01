// @flow
import { bindThis } from '../util';

import type UiStore from '../store/ui';


class UiEvent {
  _store: UiStore;

  constructor(store: UiStore) {
    bindThis(this);

    this._store = store;
  }

  onClickOpenHelpModal(): void {
    this._store.setHelpModalOpen(true);
  }
  onClickCloseHelpModal(): void {
    this._store.setHelpModalOpen(false);
  }

  onClickOpenAddLogModal(): void {
    this._store.setAddLogModalOpen(true);
  }
  onClickCloseAddLogModal(): void {
    this._store.setAddLogModalOpen(false);
  }

  onClickLogShowMore(): void {
    this._store.logShowMore();
  }

  onClickCloseModLogModal(): void {
    this._store.setModLogModalOpen(false);
  }
}

export default UiEvent;

