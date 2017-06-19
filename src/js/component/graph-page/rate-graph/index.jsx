// @flow
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RateByMode from './rate-by-mode';


const RateGraph = () => (
  <div>
    <h3>ウデマエのスイイ</h3>
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
        <RateByMode mode={0} />
      </TabPanel>
      <TabPanel>
        <RateByMode mode={1} />
      </TabPanel>
      <TabPanel>
        <RateByMode mode={2} />
      </TabPanel>
    </Tabs>
  </div>
);

export default RateGraph;
