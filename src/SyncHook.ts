import { Sync } from './Hook.js';

type TapFn<P extends unknown[]> = (...args: P) => void;

/**
 * 同步串行 hook
 * 忽略钩子函数的返回值
 */

export default class SyncHook<P extends unknown[]> extends Sync<P, TapFn<P>> {
  call(...args: P): void {
    const params = this.argsToParams(args);
    this.taps.forEach(({ fn }) => {
      fn.apply(this, params);
    });
  }
}
