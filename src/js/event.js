// @flow
import { bindThis } from './util';

import type Store from './store';
import type UiStore from './store/ui';


class Event {
  ui: UiStore;

  constructor({ ui }: Store) {
    bindThis(this);

    this.ui = ui;
  }

  onClickOpenInputPage(): void {
    this.ui.setModalOpen(true);
  }
  onClickCloseInputPage(): void {
    this.ui.setModalOpen(false);
  }
}

export default Event;
