// @flow

export function getGlobal(): window {
  return window;
}

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

export function formatDate(time: number): string {
  const date = new Date(time);
  const YYYY = date.getFullYear();
  const MM   = `0${date.getMonth() + 1}`.slice(-2);
  const DD   = `0${date.getDate()}`.slice(-2);
  const hh   = `0${date.getHours()}`.slice(-2);
  const mm   = `0${date.getMinutes()}`.slice(-2);

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
}

export function rateToRateStr(rate: number, rankTable: *): string {
  const point = rate % 100;
  const rank = (rate - point) / 100;
  const rankStr = rankTable[rank];

  if (rankStr && point >= 0) {
    return `${rankStr}${point}`;
  }
  return '';
}

export function percentage(c: number, p: number, n: number = 1): number {
  if (c === 0 || p === 0) {
    return 0;
  }

  const rate = c / p * 100;
  const pow = Math.pow(10, n);
  return Math.round(rate * pow) / pow;
}
