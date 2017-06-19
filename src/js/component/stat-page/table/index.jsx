// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RateStr from './rate-str';
import ByStage from './by-stage';

import type RecordStore from '../../../store/record';


const StatPage = ({
  record,
}: {
  record: RecordStore
}) => {
  const { stat } = record.view;

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
      <Tabs>
        <TabList className="mode-tablist">
          <Tab className="mode-tab" selectedClassName="mode-tab--selected">
            <span className="ft-ika">エリア</span>
          </Tab>
          <li>|</li>
          <Tab className="mode-tab" selectedClassName="mode-tab--selected">
            <span className="ft-ika">ヤグラ</span>
          </Tab>
          <li>|</li>
          <Tab className="mode-tab" selectedClassName="mode-tab--selected">
            <span className="ft-ika">ホコ</span>
          </Tab>
        </TabList>
        <TabPanel>
          <ByStage byStage={stat.areaByStage} />
        </TabPanel>
        <TabPanel>
          <ByStage byStage={stat.yaguraByStage} />
        </TabPanel>
        <TabPanel>
          <ByStage byStage={stat.hokoByStage} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default inject(
  'record',
)(observer(StatPage));
