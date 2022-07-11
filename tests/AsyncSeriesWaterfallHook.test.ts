import { AsyncSeriesWaterfallHook as S } from 'tapable';

import { AsyncSeriesWaterfallHook } from '../src';

describe('throwError', function () {
  it('throw error validate waterfall hooks args', () => {
    expect(() => {
      new AsyncSeriesWaterfallHook();
    }).toThrowError('Waterfall hooks must have at least one argument');
  });
});

describe('AsyncSeriesWaterfallHook callAsync', function () {
  it('multi', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapAsync('1', (name, value, cb) => {
          log.push([name, value, 1]);
          cb(null, 'after-1');
        });
        queue.tapAsync('2', (name, value, cb) => {
          log.push([name, value, 2]);
          cb(null, null);
        });
        queue.tapAsync('3', (name, value, cb) => {
          log.push([name, value, 3]);
          cb(null, 'after-3');
        });
        queue.callAsync('hooks', 0, (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('multi callback void', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapAsync('1', (name, value, cb) => {
          log.push([name, value, 1]);
          cb();
        });
        queue.tapAsync('2', (name, value, cb) => {
          log.push([name, value, 2]);
          cb();
        });
        queue.tapAsync('3', (name, value, cb) => {
          log.push([name, value, 3]);
          cb();
        });
        queue.callAsync('hooks', 0, (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('multi callback zero', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapAsync('1', (name, value, cb) => {
          log.push([name, value, 1]);
          cb();
        });
        queue.tapAsync('2', (name, value, cb) => {
          log.push([name, value, 2]);
          cb(null, 0);
        });
        queue.tapAsync('3', (name, value, cb) => {
          log.push([name, value, 3]);
          cb();
        });
        queue.callAsync('hooks', 0, (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('multi callback error', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapAsync('1', (name, value, cb) => {
          log.push([name, value, 1]);
          cb(null, 'after-1');
        });
        queue.tapAsync('2', (name, value, cb) => {
          log.push([name, value, 2]);
          cb(new Error('error-2'));
        });
        queue.tapAsync('3', (name, value, cb) => {
          log.push([name, value, 3]);
          cb(null, 'after-3');
        });
        queue.callAsync('hooks', 0, (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapAsync('1', (name, cb) => {
          log.push([name, 1]);
          cb(null, 'after-1');
        });
        queue.tapAsync('2', (name, cb) => {
          log.push([name, 2]);
          cb(null, 'after-2');
        });
        queue.tapAsync('3', (name, cb) => {
          log.push([name, 3]);
          cb(null, 'after-3');
        });
        queue.callAsync('hooks', (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single callback void', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapAsync('1', (name, cb) => {
          log.push([name, 1]);
          cb();
        });
        queue.tapAsync('2', (name, cb) => {
          log.push([name, 2]);
          cb();
        });
        queue.tapAsync('3', (name, cb) => {
          log.push([name, 3]);
          cb();
        });
        queue.callAsync('hooks', (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single callback false', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapAsync('1', (name, cb) => {
          log.push([name, 1]);
          cb();
        });
        queue.tapAsync('2', (name, cb) => {
          log.push([name, 2]);
          cb(null, false);
        });
        queue.tapAsync('3', (name, cb) => {
          log.push([name, 3]);
          cb();
        });
        queue.callAsync('hooks', (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single callback error', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapAsync('1', (name, cb) => {
          log.push([name, 1]);
          cb(null, 'after-1');
        });
        queue.tapAsync('2', (name, cb) => {
          log.push([name, 2]);
          cb(new Error('error'));
        });
        queue.tapAsync('3', (name, cb) => {
          log.push([name, 3]);
          cb(null, 'after-3');
        });
        queue.callAsync('hooks', (...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });
});

describe('AsyncSeriesWaterfallHook promise', function () {
  it('multi', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapPromise('1', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 1]);
            resolve('after-1');
          });
        });
        queue.tapPromise('2', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 2]);
            resolve(null);
          });
        });
        queue.tapPromise('3', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 3]);
            resolve('after-3');
          });
        });
        queue.promise('hooks', 0).then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('multi resolve void', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapPromise('1', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 2]);
            resolve(undefined);
          });
        });
        queue.tapPromise('3', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks', 0).then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('multi resolve zero', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapPromise('1', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 2]);
            resolve(0);
          });
        });
        queue.tapPromise('3', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks', 0).then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('multi resolve error', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapPromise('1', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 2]);
            resolve(new Error('error'));
          });
        });
        queue.tapPromise('3', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks', 0).then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('multi reject error', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapPromise('1', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name, value) => {
          return new Promise((resolve, reject) => {
            log.push([name, value, 2]);
            reject(new Error('error'));
          });
        });
        queue.tapPromise('3', (name, value) => {
          return new Promise((resolve) => {
            log.push([name, value, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks', 0).catch((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapPromise('1', (name) => {
          return new Promise((resolve) => {
            log.push([name, 1]);
            resolve('after-1');
          });
        });
        queue.tapPromise('2', (name) => {
          return new Promise((resolve) => {
            log.push([name, 2]);
            resolve('after-2');
          });
        });
        queue.tapPromise('3', (name) => {
          return new Promise((resolve) => {
            log.push([name, 3]);
            resolve('after-3');
          });
        });
        queue.promise('hooks').then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single resolve void', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapPromise('1', (name) => {
          return new Promise((resolve) => {
            log.push([name, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name) => {
          return new Promise((resolve) => {
            log.push([name, 2]);
            resolve(undefined);
          });
        });
        queue.tapPromise('3', (name) => {
          return new Promise((resolve) => {
            log.push([name, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks').then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single resolve zero', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name', 'value']);
        queue.tapPromise('1', (name) => {
          return new Promise((resolve) => {
            log.push([name, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name) => {
          return new Promise((resolve) => {
            log.push([name, 2]);
            resolve(0);
          });
        });
        queue.tapPromise('3', (name) => {
          return new Promise((resolve) => {
            log.push([name, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks').then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single resolve error', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapPromise('1', (name) => {
          return new Promise((resolve) => {
            log.push([name, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name) => {
          return new Promise((resolve) => {
            log.push([name, 2]);
            resolve(new Error('error'));
          });
        });
        queue.tapPromise('3', (name) => {
          return new Promise((resolve) => {
            log.push([name, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks').then((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('single reject error', async function () {
    function run(Hook: typeof AsyncSeriesWaterfallHook, log: any[] = []): Promise<any[]> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapPromise('1', (name) => {
          return new Promise((resolve) => {
            log.push([name, 1]);
            resolve(undefined);
          });
        });
        queue.tapPromise('2', (name) => {
          return new Promise((resolve, reject) => {
            log.push([name, 2]);
            reject(new Error('error'));
          });
        });
        queue.tapPromise('3', (name) => {
          return new Promise((resolve) => {
            log.push([name, 3]);
            resolve(undefined);
          });
        });
        queue.promise('hooks').catch((...args) => {
          log.push(['end']);
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesWaterfallHook);
    // @ts-ignore
    const b = await run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });
});
