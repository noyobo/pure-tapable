/**
 * 同步串行 hook
 * 当监听函数被触发的时，如返回 true 则会反复执行，如返回 void 则表示退出循环。
 */
import { Sync } from './Hook';

type TapFn<P extends unknown[]> = (...args: P) => void | true;

/**
 * 同步串行 hook
 * 忽略钩子函数的返回值
 */

export default class SyncLoopHook<P extends unknown[]> extends Sync<P, TapFn<P>> {
  call(...args: P) {
    let index = 0;
    const time = this.taps.length - 1;
    while (index <= time) {
      const { fn } = this.taps[index];
      const result = fn.apply(this, args);
      if (result !== true) {
        index += 1;
      }
    }
  }
}
