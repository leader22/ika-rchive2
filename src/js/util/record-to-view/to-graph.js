// @flow
import { percentage } from '../../util';

export default {
  getEmptyObj(): Graph {
    return {
      _totalPlayCount: 0,
      _areaPlayCount: 0,
      _yaguraPlayCount: 0,
      _hokoPlayCount: 0,

      areaRate: [],
      yaguraRate: [],
      hokoRate: [],
      playModeRatio: [],

      areaByStage: {},
      yaguraByStage: {},
      hokoByStage: {},
    };
  },

  assignRate(graph: Graph, item: Log): void {
    const rate = (item.rank * 100) + item.point;
    item.mode === 0 && graph.areaRate.push(rate);
    item.mode === 1 && graph.yaguraRate.push(rate);
    item.mode === 2 && graph.hokoRate.push(rate);
  },

  assignPlayCount(graph: Graph, item: Log): void {
    graph._totalPlayCount++;
    item.mode === 0 && graph._areaPlayCount++;
    item.mode === 1 && graph._yaguraPlayCount++;
    item.mode === 2 && graph._hokoPlayCount++;
  },

  assignPlayRatio(graph: Graph): void {
    graph.playModeRatio = [
      percentage(graph._areaPlayCount, graph._totalPlayCount, 2),
      percentage(graph._yaguraPlayCount, graph._totalPlayCount, 2),
      percentage(graph._hokoPlayCount, graph._totalPlayCount, 2),
    ];
  },

  assignStagePlayAndWinCount(graph: Graph, item: Log): void {
    const { stage, mode, result } = item;
    if (mode === 0) {
      stage in graph.areaByStage || (graph.areaByStage[stage] = __getByStage());
      graph.areaByStage[stage].playCount++;
      result && graph.areaByStage[stage].winCount++;
    }
    if (mode === 1) {
      stage in graph.yaguraByStage || (graph.yaguraByStage[stage] = __getByStage());
      graph.yaguraByStage[stage].playCount++;
      result && graph.yaguraByStage[stage].winCount++;
    }
    if (mode === 2) {
      stage in graph.hokoByStage || (graph.hokoByStage[stage] = __getByStage());
      graph.hokoByStage[stage].playCount++;
      result && graph.hokoByStage[stage].winCount++;
    }
  },

  assignStageWinP(graph: Graph): void {
    for (let key in graph.areaByStage) {
      const val = graph.areaByStage[Number(key)];
      val.winP = percentage(val.winCount, val.playCount, 2);
    }
    for (let key in graph.yaguraByStage) {
      const val = graph.yaguraByStage[Number(key)];
      val.winP = percentage(val.winCount, val.playCount, 2);
    }
    for (let key in graph.hokoByStage) {
      const val = graph.hokoByStage[Number(key)];
      val.winP = percentage(val.winCount, val.playCount, 2);
    }
  },
};

function __getByStage(): ByStage {
  return {
    playCount: 0,
    winCount: 0,
    loseCount: 0,
    winP: 0,
  };
}
