// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import LogModal from '../shared/log-modal';
import AddLogForm from './form';
import RecentLog from './recent-log';

import type UiStore from '../../store/ui';
import type Event from '../../event';

const AddLogModal = ({
  ui,
  event,
}: {
  ui: UiStore,
  event: Event,
}) => (
  <LogModal
    isOpen={ui.isAddLogModalOpen}
    onClickClose={event.onClickCloseAddLogModal}
  >
    <AddLogForm />
    <RecentLog />
  </LogModal>
);

export default inject(
  'ui',
  'event',
)(observer(AddLogModal));
