// @flow
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import StageByMode from './stage-by-mode';


const StageGraph = () => (
  <div>
    <h3>ステージべつのプレイすうとしょうりつ</h3>
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
        <StageByMode mode={0} />
      </TabPanel>
      <TabPanel>
        <StageByMode mode={1} />
      </TabPanel>
      <TabPanel>
        <StageByMode mode={2} />
      </TabPanel>
    </Tabs>
  </div>
);

export default StageGraph;
