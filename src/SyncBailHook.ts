type Result = void | unknown;
type TapFn<P extends unknown[]> = (...args: P) => Result;

import { Sync } from './Hook.js';

/**
 * 同步串行 hook
 * 任一函数的返回值不为 undefined，则跳过剩余函数
 */
export default class SyncBailHook<P extends unknown[]> extends Sync<P, TapFn<P>> {
  call(...args: P): Result {
    let result: Result;
    for (let i = 0; i < this.taps.length; i++) {
      const { fn } = this.taps[i];
      result = fn.apply(this, args);
      if (result != undefined) {
        break;
      }
    }
    return result;
  }
}
