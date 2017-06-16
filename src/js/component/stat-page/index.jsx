// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type RecordStore from '../../store/record';


class StatPage extends React.Component {
  props: {|
    record: RecordStore,
  |};

  render() {
    const { stat } = this.props.record;

    return (
      <div>
        <h3>バトル回数</h3>
        <ul>
          <li>総合: {stat.totalPlayCount}</li>
          <li>エリア: {stat.areaPlayCount}</li>
          <li>ヤグラ: {stat.yaguraPlayCount}</li>
          <li>ホコ: {stat.hokoPlayCount}</li>
        </ul>
        <h3>勝率と勝敗</h3>
        <ul>
          <li>総合: {stat.totalWinRate}% = {stat.totalWinCount}勝/{stat.totalLoseCount}敗</li>
          <li>エリア: {stat.areaWinRate}% = {stat.areaWinCount}勝/{stat.areaLoseCount}敗</li>
          <li>ヤグラ: {stat.yaguraWinRate}% = {stat.yaguraWinCount}勝/{stat.yaguraLoseCount}敗</li>
          <li>ホコ: {stat.hokoWinRate}% = {stat.hokoWinCount}勝/{stat.hokoLoseCount}敗</li>
        </ul>
      </div>
    );
  }
}

export default inject(
  'record',
)(observer(StatPage));
