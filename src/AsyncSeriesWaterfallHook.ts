import { Async } from './Hook.js';
import { DoneCallback, TapAsyncFn, TapPromiseFn } from './types.js';

/**
 * 异步串行 hook
 * 钩子函数的返回值作为下一个监听函数的第一个参数
 */
export default class AsyncSeriesWaterfallHook<A extends unknown[]> extends Async<A, TapAsyncFn<A>, TapPromiseFn<A>> {
  validateArgs() {
    if (this.args.length < 1) {
      throw new Error(`Waterfall hooks must have at least one argument`);
    }
  }

  callAsync = (...args: [...A, DoneCallback]) => {
    const done = args.pop() as DoneCallback;
    const params = this.argsToParams(args as unknown as A);
    const [first, ...otherParams] = params;

    let taskIndex = 0;
    let lastParam = first;
    let lastError;

    const checkDone = (error: any, result: any) => {
      taskIndex += 1;
      lastError = error;

      if (result !== undefined) {
        lastParam = result;
      }

      if (lastError instanceof Error) {
        done(lastError);
      } else if (taskIndex === this.asyncTaps.length) {
        done(null, lastParam);
      } else {
        next([lastParam, ...otherParams] as A);
      }
    };

    const next = (params: A) => {
      const { fn } = this.asyncTaps[taskIndex];
      fn.apply(this, [
        ...params,
        (error, result) => {
          checkDone(error, result);
        },
      ]);
    };
    next(params);
  };

  promise(...args: A): Promise<any> {
    const params = this.argsToParams(args);
    let taskIndex = 0;

    const [first, ...otherParams] = params;
    let lastParam = first;

    return new Promise((resolve, reject) => {
      const checkDone = (result: any) => {
        if (result !== undefined) {
          lastParam = result;
        }

        if (taskIndex === this.promiseTaps.length) {
          resolve(lastParam);
        } else {
          run([lastParam, ...otherParams] as A);
        }
      };

      const next = (args: A) => {
        const { fn } = this.promiseTaps[taskIndex];
        return fn.apply(this, args);
      };

      const run = (args: any) => {
        next(args)
          .then((result) => {
            taskIndex += 1;
            checkDone(result);
          })
          .catch(reject);
      };
      run([lastParam, ...otherParams] as A);
    });
  }
}
