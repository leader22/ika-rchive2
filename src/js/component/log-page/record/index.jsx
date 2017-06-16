// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import LogTime from './log-time';

import type UiStore from '../../../store/ui';
import type RecordStore from '../../../store/record';
import type Event from '../../../event';


const Record = ({
  record,
  ui,
  event,
  setting,
}: {
  record: RecordStore,
  ui: UiStore,
  event: Event,
  setting: Setting,
}) => {
  const itemsLen = record.items.length;
  const isNoItem = itemsLen === 0;
  const showItemsLen = ui.logPage * setting.LOG_PER_PAGE;
  const canShowMore = showItemsLen < itemsLen;

  return (
    <div>
      <ul>
        { isNoItem && (
        <li>キロクなし</li>
        ) }
        { record.items.slice(0, showItemsLen).map((log, idx) => (
        <li key={`${log.id}-${idx}`}>
          <div>
            [{record.items.length - idx}] <LogTime time={log.id} />
          </div>
          <div>
            {setting.STAGE[log.stage]}の
            {setting.MODE[log.mode]}で
            {setting.RESULT[log.result]}
          </div>
          <div>
            {setting.RANK[log.rank]}{log.point}
          </div>
          <div>
            <a onClick={() => { event.onClickOpenModLogModal(log); }}>[修正]</a>
            /
            <a onClick={() => { event.onClickDelLog(log); }}>[削除]</a>
          </div>
          <hr />
        </li>
        )) }
      </ul>
      { canShowMore && (
        <a onClick={event.onClickLogShowMore}>[もっとみる]</a>
      ) }
    </div>
  );
};

export default inject(
  'record',
  'ui',
  'setting',
  'event',
)(observer(Record));
