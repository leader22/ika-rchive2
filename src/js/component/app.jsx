// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>
            <span className="IkaFont">ウデマエア-カイブ2</span>
          </h1>
        </header>
        <Tabs>
          <TabPanel>
            グラフ
          </TabPanel>
          <TabPanel>
            統計
          </TabPanel>
          <TabPanel>
            その他
          </TabPanel>
          <TabList>
            <Tab>
              <span className="IkaFont">グラフ</span>
            </Tab>
            <Tab>
              <span className="IkaFont">トウケイ</span>
            </Tab>
            <Tab>
              <span className="IkaFont">ソノタ</span>
            </Tab>
          </TabList>
        </Tabs>
      </div>
    );
  }
}

export default observer(App);
