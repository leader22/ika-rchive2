// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import {
  LOG_PER_PAGE,
  STAGE,
  RESULT,
  RANK,
} from '../../../setting';
import ModeStr from '../../shared/mode-str';
import LogTime from './log-time';

import type UiStore from '../../../store/ui';
import type RecordStore from '../../../store/record';
import type Event from '../../../event';


const Record = ({
  record,
  ui,
  event,
}: {
  record: RecordStore,
  ui: UiStore,
  event: Event,
}) => {
  const itemsLen = record.items.length;
  const showItemsLen = ui.logPage * LOG_PER_PAGE;
  const canShowMore = showItemsLen < itemsLen;

  return (
    <div>
      <ul>
        { record.items.slice(-showItemsLen).reverse().map((log, idx) => (
        <li key={`${log.id}-${idx}`}>
          <div className="log-item">
            <div>
              [{itemsLen - idx}] <LogTime time={log.id} />
            </div>
            <div>
              <ModeStr mode={log.mode} /> in {STAGE[log.stage]}
            </div>
            <div>
              {RESULT[log.result]} - {RANK[log.rank]}{log.point}
            </div>
            <div className="log-item__action">
              <a onClick={() => { event.onClickOpenModLogModal(log); }}>[修正]</a>
              <span> </span>
              <a onClick={() => { event.onClickDelLog(log); }}>[削除]</a>
            </div>
          </div>
        </li>
        )) }
      </ul>
      { canShowMore && (
        <div className="log-showmore">
          <a onClick={event.onClickLogShowMore}>[もっとみる]</a>
        </div>
      ) }
    </div>
  );
};

export default inject(
  'record',
  'ui',
  'event',
)(observer(Record));
