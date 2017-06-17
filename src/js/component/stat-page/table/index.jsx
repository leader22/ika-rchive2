// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import { STAGE } from '../../../setting';
import RateStr from './rate-str';

import type RecordStore from '../../../store/record';


const StatPage = ({
  record,
}: {
  record: RecordStore
}) => {
  const { stat } = record;

  return (
    <div>
      <h3>ウデマエ</h3>
      <ul>
        <li>エリア: 最高<RateStr rate={stat.areaBestRate} />/平均<RateStr rate={stat.areaAvgRate} /></li>
        <li>ヤグラ: 最高<RateStr rate={stat.yaguraBestRate} />/平均<RateStr rate={stat.yaguraAvgRate} /></li>
        <li>ホコ: 最高<RateStr rate={stat.hokoBestRate} />/平均<RateStr rate={stat.hokoAvgRate} /></li>
      </ul>

      <h3>しょうりつ・かちまけ</h3>
      <ul>
        <li>総合: {stat.totalWinP}% = {stat.totalPlayCount}戦/{stat.totalWinCount}勝/{stat.totalLoseCount}敗</li>
        <li>エリア: {stat.areaWinP}% = {stat.areaPlayCount}戦/{stat.areaWinCount}勝/{stat.areaLoseCount}敗</li>
        <li>ヤグラ: {stat.yaguraWinP}% = {stat.yaguraPlayCount}戦/{stat.yaguraWinCount}勝/{stat.yaguraLoseCount}敗</li>
        <li>ホコ: {stat.hokoWinP}% = {stat.hokoPlayCount}戦/{stat.hokoWinCount}勝/{stat.hokoLoseCount}敗</li>
      </ul>

      <h3>ステージべつかちまけ</h3>
      <h4>エリア</h4>
      <ul>
        { Object.entries(stat.areaByStage).map(([stage, byStage]) => (
        <li key={stage}>
          {/* flow-disable-line */}
          {STAGE[stage]}: {byStage.winP}% = {byStage.playCount}戦/{byStage.winCount}勝/{byStage.loseCount}敗
        </li>
        )) }
      </ul>
      <h4>ヤグラ</h4>
      <ul>
        { Object.entries(stat.yaguraByStage).map(([stage, byStage]) => (
        <li key={stage}>
          {/* flow-disable-line */}
          {STAGE[stage]}: {byStage.winP}% = {byStage.playCount}戦/{byStage.winCount}勝/{byStage.loseCount}敗
        </li>
        )) }
      </ul>
      <h4>ホコ</h4>
      <ul>
        { Object.entries(stat.hokoByStage).map(([stage, byStage]) => (
        <li key={stage}>
          {/* flow-disable-line */}
          {STAGE[stage]}: {byStage.winP}% = {byStage.playCount}戦/{byStage.winCount}勝/{byStage.loseCount}敗
        </li>
        )) }
      </ul>
    </div>
  );
};

export default inject(
  'record',
)(observer(StatPage));
