// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';

import NoItem from '../../shared/no-item';
import { getGlobal } from '../../../util';
import { STAGE } from '../../../setting';

import type RecordStore from '../../../store/record';

const window = getGlobal();


function getChartConfig() {
  return {
    title: { text: null, },
    credits: { enabled: false, },
    legend: { enabled: false, },
    chart: {
      type: 'column',
      alignTicks: false,
      backgroundColor: 'transparent',
      height: window.innerHeight * 0.4,
      spacing: [10, 0, 10, 0],
    },
    xAxis: {
      categories: [],
      labels: {
        style: { color: '#fff', },
      },
    },
    yAxis: [
      {
        title: { text: null, },
        labels: {
          style: { color: '#fff', },
        },
      },
      {
        title: { text: null, },
        opposite: true,
        max: 100,
        labels: {
          format: '{value}%',
          style: { color: '#fff', },
        },
      },
    ],
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    tooltip: {
      shared: true,
      backgroundColor: '#000',
      style: { color: '#fff', },
    },
    series: [],
  };
}

const StageByMode = ({
  mode,
  record,
}: {
  mode: number,
  record: RecordStore,
}) => {
  const playCountSeries = {
    name: 'プレイすう',
    color: '#ED2772',
    data: [],
  };
  const winPSeries = {
    name: 'しょうりつ',
    color: '#1AD118',
    yAxis: 1,
    data: [],
  };

  let byStage = {};
  if (mode === 0) {
    byStage = record.view.graph.areaByStage;
  }
  if (mode === 1) {
    byStage = record.view.graph.yaguraByStage;
  }
  if (mode === 2) {
    byStage = record.view.graph.hokoByStage;
  }

  const stages = [];
  Object.keys(byStage).forEach(key => {
    const { playCount, winP } = byStage[Number(key)];
    stages.push(STAGE[Number(key)]);
    playCountSeries.data.push(playCount);
    winPSeries.data.push(winP);
  });

  if (stages.length === 0) {
    return <NoItem />;
  }

  const config = getChartConfig();
  config.xAxis.categories = stages;
  config.series.push(playCountSeries, winPSeries);
  return (
    <ReactHighcharts config={config} />
  );
};

export default inject(
  'record',
)(observer(StageByMode));
