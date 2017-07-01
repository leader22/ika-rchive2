// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ByWeapon from './by-weapon';

import type RecordStore from '../../../store/record';


const WeaponTable = ({
  record,
}: {
  record: RecordStore
}) => {
  const { stat } = record.view;

  return (
    <div>
      <h2>ブキしようかいすう</h2>
      <ByWeapon byWeapon={stat.byWeapon} />

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
          <ByWeapon byWeapon={stat.areaByWeapon} />
        </TabPanel>
        <TabPanel>
          <ByWeapon byWeapon={stat.yaguraByWeapon} />
        </TabPanel>
        <TabPanel>
          <ByWeapon byWeapon={stat.hokoByWeapon} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default inject(
  'record',
)(observer(WeaponTable));
