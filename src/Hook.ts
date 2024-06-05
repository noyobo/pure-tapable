import { DoneCallback } from './types.js';

abstract class Hook<A extends unknown[]> {
  protected readonly args: string[];

  protected constructor(args: string[] = []) {
    this.args = args;
    this.validateArgs?.();
  }

  /**
   * 获取运行参数，受实例化参数决定
   * @private
   */
  protected argsToParams(params: A): A {
    return this.args.map((name, index) => {
      return params[index];
    }) as A;
  }

  protected validateArgs?(): void;
}

/**
 * 同步 Hook 基类
 */
export abstract class Sync<A extends unknown[], F> extends Hook<A> {
  protected readonly taps: Array<{ name: string; fn: F }>;

  /**
   * 钩子参数
   * @param args
   */
  constructor(args?: string[]) {
    super(args);
    this.taps = [];
  }

  tap(name: string, fn: F): void {
    this.taps.push({ name, fn });
  }

  // 由继承者实现
  abstract call(...args: unknown[]): any;
}

/**
 * 异步 Hook 基类
 */
export abstract class Async<A extends unknown[], F, P> extends Hook<A> {
  protected readonly asyncTaps: Array<{ name: string; fn: F }>;
  protected readonly promiseTaps: Array<{ name: string; fn: P }>;

  constructor(args?: string[]) {
    super(args);
    this.asyncTaps = [];
    this.promiseTaps = [];
  }

  tapAsync(name: string, fn: F) {
    this.asyncTaps.push({ name, fn });
  }

  tapPromise(name: string, fn: P) {
    this.promiseTaps.push({ name, fn });
  }

  abstract callAsync(...args: [...A, DoneCallback]): any;

  abstract promise(...args: A): Promise<any>;
}
