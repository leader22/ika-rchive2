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
