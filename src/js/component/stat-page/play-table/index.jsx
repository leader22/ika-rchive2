// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type RecordStore from '../../../store/record';


const PlayTable = ({
  record,
}: {
  record: RecordStore
}) => {
  const { stat } = record.view;

  return (
    <div>
      <h2>プレイわりあい</h2>
      <table className="stat-table">
        <tbody>
          <tr>
            <td></td>
            <td>割合</td>
            <td>プレイ数</td>
          </tr>
          <tr>
            <td>エリア</td>
            <td>{stat.areaPlayP}%</td>
            <td>{stat.areaPlayCount}戦</td>
          </tr>
          <tr>
            <td>ヤグラ</td>
            <td>{stat.yaguraPlayP}%</td>
            <td>{stat.yaguraPlayCount}戦</td>
          </tr>
          <tr>
            <td>ホコ</td>
            <td>{stat.hokoPlayP}%</td>
            <td>{stat.hokoPlayCount}戦</td>
          </tr>
          <tr>
            <td>総合</td>
            <td>100%</td>
            <td>{stat.totalPlayCount}戦</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default inject(
  'record',
)(observer(PlayTable));
