// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import type RecordStore from '../../store/record';


const ShareText = () => {
  return (
    <div className="">
      <h2>そうごう</h2>
      <textarea className="share-text" defaultValue={'ほげほげ'}></textarea>

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
          <textarea className="share-text" defaultValue={'エリア'}></textarea>
        </TabPanel>
        <TabPanel>
          <textarea className="share-text" defaultValue={'ヤグラ'}></textarea>
        </TabPanel>
        <TabPanel>
          <textarea className="share-text" defaultValue={'ホコ'}></textarea>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default inject(
)(observer(ShareText));
