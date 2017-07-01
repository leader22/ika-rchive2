// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import Modal from '../shared/modal';
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
  <Modal
    isOpen={ui.isModLogModalOpen}
    onClickClose={event.ui.onClickCloseModLogModal}
  >
    <ModLogForm />
  </Modal>
);

export default inject(
  'ui',
  'event',
)(observer(ModLogModal));
