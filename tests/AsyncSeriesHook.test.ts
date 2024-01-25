import { describe, expect, it } from 'vitest';
import { AsyncSeriesHook as S } from 'tapable';

import { AsyncSeriesHook } from '../src';

describe('AsyncSeriesHook', function () {
  it('callAsync empty', async function () {
    function run(Hook: typeof AsyncSeriesHook, log: any[] = []): Promise<any> {
      return new Promise((resolve) => {
        const queue = new Hook<[]>();
        queue.tapAsync('1', function one(cb) {
          setTimeout(() => {
            log.push([1]);
            cb();
          }, 100);
        });
        queue.tapAsync('2', function two(cb) {
          setTimeout(() => {
            log.push([2]);
            cb();
          }, 100);
        });
        queue.tapAsync('3', function three(cb) {
          setTimeout(() => {
            log.push([3]);
            cb();
          }, 100);
        });
        queue.callAsync(function done(...args) {
          log.push('end');
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('callAsync multi', async function () {
    function run(Hook: typeof AsyncSeriesHook, log: any[] = []): Promise<any> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapAsync('1', function one(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 1]);
            cb();
          }, 100);
        });
        queue.tapAsync('2', function two(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 2]);
            cb();
          }, 100);
        });
        queue.tapAsync('3', function three(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 3]);
            cb();
          }, 100);
        });
        queue.callAsync('hooks', 0, function done(...args) {
          log.push('end');
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('callAsync multi return value ignore', async function () {
    function run(Hook: typeof AsyncSeriesHook, log: any[] = []): Promise<any> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapAsync('1', function one(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 1]);
            cb();
          }, 100);
        });
        queue.tapAsync('2', function two(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 2]);
            cb(null, 4);
          }, 100);
        });
        queue.tapAsync('3', function three(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 3]);
            cb();
          }, 100);
        });
        queue.callAsync('hooks', 0, function done(...args) {
          log.push('end');
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('callAsync multi return error', async function () {
    function run(Hook: typeof AsyncSeriesHook, log: any[] = []): Promise<any> {
      return new Promise((resolve) => {
        const queue = new Hook<[string, number]>(['name', 'value']);
        queue.tapAsync('1', function one(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 1]);
            cb();
          }, 100);
        });
        queue.tapAsync('2', function two(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 2]);
            cb(new Error('error-2'));
          }, 100);
        });
        queue.tapAsync('3', function three(name, value, cb) {
          setTimeout(() => {
            log.push([name, value, 3]);
            cb();
          }, 100);
        });
        queue.callAsync('hooks', 0, function done(...args) {
          log.push('end');
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('callAsync single', async function () {
    function run(Hook: typeof AsyncSeriesHook, log: any[] = []): Promise<any> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapAsync('1', function one(name, cb) {
          setTimeout(() => {
            log.push([name, 1]);
            cb();
          }, 100);
        });
        queue.tapAsync('2', function two(name, cb) {
          setTimeout(() => {
            log.push([name, 2]);
            cb();
          }, 100);
        });
        queue.tapAsync('3', function three(name, cb) {
          setTimeout(() => {
            log.push([name, 3]);
            cb();
          }, 100);
        });
        queue.callAsync('hooks', function done(...args) {
          log.push('end');
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('callAsync single return value ignore', async function () {
    function run(Hook: typeof AsyncSeriesHook, log: any[] = []): Promise<any> {
      return new Promise((resolve) => {
        const queue = new Hook<[string]>(['name']);
        queue.tapAsync('1', function one(name, cb) {
          setTimeout(() => {
            log.push([name, 1]);
            cb();
          }, 100);
        });
        queue.tapAsync('2', function two(name, cb) {
          setTimeout(() => {
            log.push([name, 2]);
            cb(null, 4);
          }, 100);
        });
        queue.tapAsync('3', function three(name, cb) {
          setTimeout(() => {
            log.push([name, 3]);
            cb();
          }, 100);
        });
        queue.callAsync('hooks', function done(...args) {
          log.push('end');
          log.push(args);
          resolve(log);
        });
      });
    }

    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('promise resolve multi', async function () {
    async function run(Hook: typeof AsyncSeriesHook, log: any[] = []) {
      const queue = new AsyncSeriesHook(['name', 'value']);
      queue.tapPromise('1', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 1]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('2', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 2]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('3', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 3]);
            resolve(undefined);
          }, 100);
        });
      });
      return queue.promise('hooks', 0).then((value) => {
        log.push(['end']);
        log.push([value]);
        return log;
      });
    }
    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('promise resolve multi return value ignore', async function () {
    async function run(Hook: typeof AsyncSeriesHook, log: any[] = []) {
      const queue = new AsyncSeriesHook(['name', 'value']);
      queue.tapPromise('1', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 1]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('2', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 2]);
            resolve(4);
          }, 100);
        });
      });
      queue.tapPromise('3', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 3]);
            resolve(undefined);
          }, 100);
        });
      });
      return queue.promise('hooks', 0).then((value) => {
        log.push(['end']);
        log.push([value]);
        return log;
      });
    }
    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('promise reject multi return value ignore', async function () {
    async function run(Hook: typeof AsyncSeriesHook, log: any[] = []) {
      const queue = new AsyncSeriesHook(['name', 'value']);
      queue.tapPromise('1', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 1]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('2', function (name, value) {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            log.push([name, value, 2]);
            reject(4);
          }, 100);
        });
      });
      queue.tapPromise('3', function (name, value) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, value, 3]);
            resolve(undefined);
          }, 100);
        });
      });
      return queue.promise('hooks', 0).catch((value) => {
        log.push(['error']);
        log.push([value]);
        return log;
      });
    }
    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('promise resolve single', async function () {
    async function run(Hook: typeof AsyncSeriesHook, log: any[] = []) {
      const queue = new AsyncSeriesHook(['name']);
      queue.tapPromise('1', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 1]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('2', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 2]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('3', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 3]);
            resolve(undefined);
          }, 100);
        });
      });
      return queue.promise('hooks', 0).then((value) => {
        log.push(['end']);
        log.push([value]);
        return log;
      });
    }
    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('promise resolve single return value ignore', async function () {
    async function run(Hook: typeof AsyncSeriesHook, log: any[] = []) {
      const queue = new AsyncSeriesHook(['name', 'value']);
      queue.tapPromise('1', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 1]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('2', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 2]);
            resolve(4);
          }, 100);
        });
      });
      queue.tapPromise('3', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 3]);
            resolve(undefined);
          }, 100);
        });
      });
      return queue.promise('hooks').then((...args) => {
        log.push(['end']);
        log.push(args);
        return log;
      });
    }
    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });

  it('promise reject single return value ignore', async function () {
    async function run(Hook: typeof AsyncSeriesHook, log: any[] = []) {
      const queue = new AsyncSeriesHook(['name', 'value']);
      queue.tapPromise('1', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 1]);
            resolve(undefined);
          }, 100);
        });
      });
      queue.tapPromise('2', function (name) {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            log.push([name, 2]);
            reject(4);
          }, 100);
        });
      });
      queue.tapPromise('3', function (name) {
        return new Promise(function (resolve) {
          setTimeout(() => {
            log.push([name, 3]);
            resolve(undefined);
          }, 100);
        });
      });
      return queue.promise('hooks').catch((...args) => {
        log.push(['error']);
        log.push(args);
        return log;
      });
    }
    const a = await run(AsyncSeriesHook, []);
    // @ts-ignore
    const b = await run(S, []);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a).toMatchObject(b);
  });
});
