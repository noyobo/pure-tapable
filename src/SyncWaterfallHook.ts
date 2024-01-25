import { Sync } from './Hook.js';

type ArrayElement<ArrayType extends unknown[]> = ArrayType[0] | any;

type TapFn<A extends unknown[]> = (...args: A) => ArrayElement<A>;

/**
 * 同步串行 hook
 * 钩子函数的返回值作为下一个监听函数的第一个参数
 */
export default class SyncWaterfallHook<A extends unknown[]> extends Sync<A, TapFn<A>> {
  protected validateArgs() {
    if (this.args.length < 1) {
      throw new Error(`Waterfall hooks must have at least one argument`);
    }
  }

  call(...args: A): ArrayElement<A> {
    const params = this.argsToParams(args);
    const [first, ...otherParams] = params;

    let lastParam = first;

    for (let i = 0; i < this.taps.length; i++) {
      const { fn } = this.taps[i];
      // 返回值作为下一个函数的收个参数
      const result = fn.apply(this, [lastParam, ...otherParams] as A);
      /* istanbul ignore else */
      if (result !== undefined) {
        lastParam = result;
      }
    }

    return lastParam;
  }
}
