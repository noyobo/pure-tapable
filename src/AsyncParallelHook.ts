import { Async } from './Hook.js';
import type { DoneCallback, TapAsyncFn, TapPromiseFn } from './types';

/**
 * 异步并行 hook
 * 忽略钩子函数的返回值
 */
export default class AsyncParallelHook<A extends unknown[]> extends Async<A, TapAsyncFn<A>, TapPromiseFn<A>> {
  callAsync = (...args: [...A, DoneCallback]) => {
    const done = args.pop() as DoneCallback;
    const argv = args as unknown as A;
    let isComplete = false;
    let taskDone = this.asyncTaps.length;

    // 所有异步函数执行完成触发 callAsync 回调
    const checkDone = (error: any) => {
      if (!isComplete) {
        taskDone -= 1;
        if (error != undefined) {
          isComplete = true;
          done(error);
        } else if (taskDone == 0) {
          isComplete = true;
          done();
        }
      }
    };

    for (let i = 0; i < this.asyncTaps.length; i++) {
      const { fn } = this.asyncTaps[i];
      // @ts-ignore
      fn.apply(this, [
        ...argv,
        function taskCallback(error) {
          checkDone(error);
        },
      ]);
    }
  };

  promise = (...args: A): Promise<void[]> => {
    return Promise.all(
      this.promiseTaps.map(({ fn }) => {
        return fn.apply(this, args);
      }),
    );
  };
}
