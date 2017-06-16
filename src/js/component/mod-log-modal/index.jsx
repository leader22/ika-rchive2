// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import ModLogForm from './form';

import type UiStore from '../../store/ui';
import type Event from '../../event';

class ModLogModal extends React.Component {
  props: {|
    ui: UiStore,
    event: Event,
  |};

  render() {
    const { ui, event } = this.props;

    return (
      <div className={`mod-log-modal ${ui.isModLogModalOpen ? 'mod-log-modal--opened' : ''}`}>
        <header className="app-header">
          <button
            className="app-header__action"
            type="button"
            onClick={event.onClickCloseModLogModal}
          >
            <span className="ft-ika">キャンセル</span>
          </button>
        </header>
        <ModLogForm />
      </div>
    );
  }
}

export default inject(
  'ui',
  'event',
)(observer(ModLogModal));
