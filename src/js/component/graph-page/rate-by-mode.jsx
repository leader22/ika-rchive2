// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';

import NoItem from '../shared/no-item';
import { rateToRateStr } from '../../util';
import { RANK } from '../../setting';

import type RecordStore from '../../store/record';


function getChartConfig() {
  return {
    title: { text: null, },
    credits: { enabled: false, },
    legend: { enabled: false, },
    chart: {
      backgroundColor: 'transparent',
      zoomType: 'x',
      height: window.innerHeight * 0.4,
      spacing: [10, 0, 10, 0],
    },
    xAxis: {
      // 拡大時の最小単位を1"件"に固定したい（0.5試合目とかないから）
      allowDecimals: false,
      labels: {
        style: { color: '#fff', },
      },
    },
    yAxis: {
      title: { text: null, },
      labels: {
        formatter: function() {
          return rateToRateStr(this.value, RANK);
        },
        style: { color: '#fff', },
      },
      allowDecimals: false,
    },
    plotOptions: {
      area: {
        // ズーム時にyAxisを調整
        threshold: null,
      }
    },
    tooltip: {
      backgroundColor: '#000',
      style: { color: '#fff', },
      formatter: function() {
        return rateToRateStr(this.y, RANK);
      },
    },
    series: [],
  };
}

const RateByMode = ({
  mode,
  record,
}: {
  mode: number,
  record: RecordStore,
}) => {
  const seriesData = {
    color: '',
    data: [],
    type: 'area',
    // idxではなく1から
    pointStart: 1,
  };
  if (mode === 0) {
    seriesData.color = '#FF7D10';
    seriesData.data = record.graph.areaRate;
  }
  if (mode === 1) {
    seriesData.color = '#553ABA';
    seriesData.data = record.graph.yaguraRate;
  }
  if (mode === 2) {
    seriesData.color = '#FDF81E';
    seriesData.data = record.graph.hokoRate;
  }

  if (seriesData.data.length === 0) {
    return <NoItem />;
  }

  const config = getChartConfig();
  config.series.push(seriesData);
  return (
    <ReactHighcharts config={config} />
  );
};

export default inject(
  'record',
)(observer(RateByMode));
