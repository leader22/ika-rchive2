// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import RateInput from './shared/rate-input';

import type UiStore from '../store/ui';
import type Event from '../event';


const InputPage = ({
  ui,
  event,
}: {
  ui: UiStore,
  event: Event,
}) => (
<div className={`input-modal ${ui.isModalOpen ? 'input-modal--opened' : ''}`}>
  <header className="app-header">
    <button className="app-header__action" onClick={event.onClickCloseInputPage}>
      <span className="ft-ika">キャンセル</span>
    </button>
  </header>
  <div>
    Input
    <RateInput />
  </div>
</div>
);

export default inject(
  'ui',
  'event',
)(observer(InputPage));
