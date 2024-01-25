import { Async } from './Hook.js';
import type { DoneCallback, TapAsyncFn, TapPromiseFn } from './types';

/**
 * 并行串行 hook
 * 任一函数的返回非空值，则跳过剩余函数
 *
 * FIXME: 实现并行可中断
 */
export default class AsyncParallelBailHook<A extends unknown[]> extends Async<A, TapAsyncFn<A>, TapPromiseFn<A>> {
  callAsync = (...args: [...A, DoneCallback]) => {
    let taskIndex = 0;
    const asyncTaps = this.asyncTaps;
    const taskLength = asyncTaps.length;

    const done = args.pop() as DoneCallback;
    const params = this.argsToParams(args as unknown as A);

    const next = (error?: any, result?: any) => {
      if (error != undefined) return done(error);
      if (typeof result !== 'undefined') return done(null, result);

      if (taskIndex === taskLength) {
        done();
      } else {
        const { fn } = asyncTaps[taskIndex];
        fn.apply(this, [
          ...params,
          (error, result) => {
            taskIndex += 1;
            next(error, result);
          },
        ]);
      }
    };
    next();
  };

  promise = (...args: A): Promise<any> => {
    const params = this.argsToParams(args);
    let taskIndex = 0;

    return new Promise((resolve, reject) => {
      const next = async (value?: any) => {
        if (taskIndex === this.promiseTaps.length) {
          return resolve(value);
        }
        const { fn } = this.promiseTaps[taskIndex];
        return await fn(...params);
      };

      const checkDone = (result?: any) => {
        if (typeof result !== 'undefined') {
          return resolve(result);
        }
        next()
          .then((value) => {
            taskIndex += 1;
            checkDone(value);
          })
          .catch((error) => {
            reject(error);
          });
      };

      checkDone();
    });
  };
}
