// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { RANK } from '../../../setting';
import {
  rankAndPointToRate,
  rateToRateStr,
} from '../../../util';
import CopyTextarea from './copy-textarea';

import type RecordStore from '../../../store/record';


const ShareText = ({
  record,
}: {
  record: RecordStore,
}) => {
  const { view, lastRankAndPoint } = record;
  const { stat } = view;
  const lastAreaRate = rankAndPointToRate(...(lastRankAndPoint.get(0) || [0, 0]));
  const lastYaguraRate = rankAndPointToRate(...(lastRankAndPoint.get(1) || [0, 0]));
  const lastHokoRate = rankAndPointToRate(...(lastRankAndPoint.get(2) || [0, 0]));

  const endText = '\n#ウデマエアーカイブ2 https://ika2.lealog.net';

  const totalText = `
    ガチマッチを${stat.totalPlayCount}戦プレイした！\n最高ウデマエは、エリア: ${rateToRateStr(stat.areaBestRate, RANK)}、ヤグラ: ${rateToRateStr(stat.yaguraBestRate, RANK)}、ホコ: ${rateToRateStr(stat.hokoBestRate, RANK)}だ！3ルール総合の勝率は${stat.totalWinP}%！
  `.trim() + endText;

  const areaText = `ガチエリアのウデマエが${rateToRateStr(lastAreaRate, RANK)}になったぞ！\n最近の勝率は${stat.areaWinP}%！${stat.areaPlayCount}戦プレイして、平均ウデマエは${rateToRateStr(stat.areaAvgRate, RANK)}！` + endText;
  const yaguraText = `ガチヤグラのウデマエが${rateToRateStr(lastYaguraRate, RANK)}になったぞ！\n最近の勝率は${stat.yaguraWinP}%！${stat.yaguraPlayCount}戦プレイして、平均ウデマエは${rateToRateStr(stat.yaguraAvgRate, RANK)}！` + endText;
  const hokoText = `ガチホコのウデマエが${rateToRateStr(lastHokoRate, RANK)}になったぞ！\n最近の勝率は${stat.hokoWinP}%！${stat.hokoPlayCount}戦プレイして、平均ウデマエは${rateToRateStr(stat.hokoAvgRate, RANK)}！` + endText;

  return (
    <div>
      <h2>そうごう</h2>
      <CopyTextarea text={totalText} />

      <h2>ルールべつ</h2>
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
          <CopyTextarea text={areaText} />
        </TabPanel>
        <TabPanel>
          <CopyTextarea text={yaguraText} />
        </TabPanel>
        <TabPanel>
          <CopyTextarea text={hokoText} />
        </TabPanel>
      </Tabs>

      <p className="app-note">※テキストをコピーしてシェアしよう！</p>
    </div>
  );
};

export default inject(
  'record'
)(observer(ShareText));
