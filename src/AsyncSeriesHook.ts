import { Async } from './Hook.js';
import { DoneCallback, TapAsyncFn, TapPromiseFn } from './types';

/**
 * 异步串行 hook
 * 忽略钩子函数的返回值
 */
export default class AsyncSeriesHook<A extends unknown[]> extends Async<A, TapAsyncFn<A>, TapPromiseFn<A>> {
  callAsync = (...args: [...A, DoneCallback]) => {
    let taskIndex = 0;
    const asyncTaps = this.asyncTaps;
    const taskLength = asyncTaps.length;

    const done = args.pop() as DoneCallback;
    const params = this.argsToParams(args as unknown as A);

    const next = (error?: any, value?: any) => {
      if (error != undefined) return done(error);

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
    return new Promise((resolve, reject) => {
      let taskIndex = 0;
      const next = async (value?: any) => {
        if (taskIndex === this.promiseTaps.length) {
          return resolve(value);
        }

        const { fn } = this.promiseTaps[taskIndex];
        return await fn.apply(this, params);
      };

      const checkDone = () => {
        next()
          .then((value) => {
            taskIndex += 1;
            checkDone();
          })
          .catch((error) => {
            reject(error);
          });
      };

      checkDone();
    });
  };
}
