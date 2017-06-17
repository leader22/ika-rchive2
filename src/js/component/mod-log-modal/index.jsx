// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import LogModal from '../shared/log-modal';
import ModLogForm from './form';

import type UiStore from '../../store/ui';
import type Event from '../../event';


const ModLogModal = ({
  ui,
  event,
}: {
  ui: UiStore,
  event: Event,
}) => (
  <LogModal
    isOpen={ui.isModLogModalOpen}
    onClickClose={event.onClickCloseModLogModal}
  >
    <ModLogForm />
  </LogModal>
);

export default inject(
  'ui',
  'event',
)(observer(ModLogModal));
