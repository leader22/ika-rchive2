// @flow


export function bindThis(instance: any): void {
  const proto: any = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto)
    .filter(name => name !== 'constructor'
      && typeof proto[name] === 'function')
    .forEach(key => {
      instance[key] = instance[key].bind(instance);
    });
}

// そのままのタイムスタンプだと長いので、容量削減のため
export function encodeTime(now: number): number {
  const base = new Date('2017/03/03').getTime();
  return ((now - base) / 1000)|0;
}

export function decodeTime(time: number): number {
  const base = new Date('2017/03/03').getTime();
  return (time * 1000) + base;
}

export function rateToRateStr(rate: number, rankTable: *): string {
  const point = rate % 100;
  const rank = (rate - point) / 100;
  const rankStr = rankTable[rank];
  return `${rankStr}${point}`;
}
