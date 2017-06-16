// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import AddLogForm from './form';

import type UiStore from '../../store/ui';
import type Event from '../../event';


class AddLogModal extends React.Component {
  props: {|
    ui: UiStore,
    event: Event,
  |};

  render() {
    const { ui, event } = this.props;

    return (
      <div className={`add-log-modal ${ui.isAddLogModalOpen ? 'add-log-modal--opened' : ''}`}>
        <header className="app-header">
          <button
            className="app-header__action"
            type="button"
            onClick={event.onClickCloseAddLogModal}
          >
            <span className="ft-ika">キャンセル</span>
          </button>
        </header>
        <AddLogForm />
      </div>
    );
  }
}

export default inject(
  'ui',
  'event',
)(observer(AddLogModal));
