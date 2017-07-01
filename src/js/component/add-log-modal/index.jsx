// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import Modal from '../shared/modal';
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
  <Modal
    isOpen={ui.isAddLogModalOpen}
    onClickClose={event.ui.onClickCloseAddLogModal}
  >
    <AddLogForm />
    <RecentLog />
  </Modal>
);

export default inject(
  'ui',
  'event',
)(observer(AddLogModal));
