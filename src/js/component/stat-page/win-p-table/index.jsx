// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ByStage from './by-stage';

import type RecordStore from '../../../store/record';


const WinPTable = ({
  record,
}: {
  record: RecordStore
}) => {
  const { stat } = record.view;

  return (
    <div>
      <h2>しょうりつ</h2>
      <table className="stat-table">
        <tbody>
          <tr>
            <td></td>
            <td>勝率</td>
            <td>内訳</td>
          </tr>
          <tr>
            <td>エリア</td>
            <td>{stat.areaWinP}%</td>
            <td>{stat.areaWinCount}勝{stat.areaLoseCount}敗</td>
          </tr>
          <tr>
            <td>ヤグラ</td>
            <td>{stat.yaguraWinP}%</td>
            <td>{stat.yaguraWinCount}勝{stat.yaguraLoseCount}敗</td>
          </tr>
          <tr>
            <td>ホコ</td>
            <td>{stat.hokoWinP}%</td>
            <td>{stat.hokoWinCount}勝{stat.hokoLoseCount}敗</td>
          </tr>
          <tr>
            <td>総合</td>
            <td>{stat.totalWinP}%</td>
            <td>{stat.totalWinCount}勝{stat.totalLoseCount}敗</td>
          </tr>
        </tbody>
      </table>

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
)(observer(WinPTable));
