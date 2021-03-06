// @flow
import toGraph from './to-graph';
import toStat from './to-stat';

import type { IObservableArray } from 'mobx';


export default function recordToView(items: IObservableArray<Log>) {
  const graph = toGraph.getEmptyObj();
  const stat = toStat.getEmptyObj();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    toGraph.assignRate(graph, item);
    toGraph.assignStagePlayAndWinCount(graph, item);

    toStat.assignPlayCount(stat, item);
    toStat.assignWinCount(stat, item);
    toStat.assignBestRate(stat, item);
    toStat.assignStagePlayAndWinCount(stat, item);
    toStat.assignWeaponPlayAndWinCount(stat, item);
  }

  toGraph.assignStageWinP(graph);

  toStat.assignWinP(stat);
  toStat.assignLoseCount(stat);
  toStat.assignPlayP(stat);
  toStat.assignAvgRate(stat);
  toStat.assignStageWinP(stat);
  toStat.assignStageLoseCount(stat);

  return {
    graph,
    stat,
  };
}
