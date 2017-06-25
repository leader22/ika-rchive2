// @flow
import { percentage } from '../../../util';


export default {
  getEmptyObj(): Graph {
    return {
      areaRate: [],
      yaguraRate: [],
      hokoRate: [],

      areaByStage: {},
      yaguraByStage: {},
      hokoByStage: {},
    };
  },

  assignRate(graph: Graph, item: Log): void {
    const rate = (item.rk * 100) + item.pt;
    item.md === 0 && graph.areaRate.push(rate);
    item.md === 1 && graph.yaguraRate.push(rate);
    item.md === 2 && graph.hokoRate.push(rate);
  },

  assignStagePlayAndWinCount(graph: Graph, item: Log): void {
    const { st, md, rs } = item;
    if (md === 0) {
      st in graph.areaByStage || (graph.areaByStage[st] = __getByStage());
      graph.areaByStage[st].playCount++;
      rs && graph.areaByStage[st].winCount++;
    }
    if (md === 1) {
      st in graph.yaguraByStage || (graph.yaguraByStage[st] = __getByStage());
      graph.yaguraByStage[st].playCount++;
      rs && graph.yaguraByStage[st].winCount++;
    }
    if (md === 2) {
      st in graph.hokoByStage || (graph.hokoByStage[st] = __getByStage());
      graph.hokoByStage[st].playCount++;
      rs && graph.hokoByStage[st].winCount++;
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
