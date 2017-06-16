// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type RecordStore from '../../store/record';


class StatPage extends React.Component {
  props: {|
    record: RecordStore,
  |};

  render() {
    const {
      totalPlayCount,
      areaPlayCount,
      yaguraPlayCount,
      hokoPlayCount,
    } = this.props.record.stat;

    return (
      <div>
        <h3>バトル回数</h3>
        <ul>
          <li>総合: {totalPlayCount}</li>
          <li>エリア: {areaPlayCount}</li>
          <li>ヤグラ: {yaguraPlayCount}</li>
          <li>ホコ: {hokoPlayCount}</li>
        </ul>
      </div>
    );
  }
}

export default inject(
  'record',
)(observer(StatPage));
