import { SyncWaterfallHook as S } from 'tapable';

import { SyncWaterfallHook } from '../src';

describe('SyncWaterfallHook', function () {
  it('call multi empty', function () {
    function run(Hook: typeof SyncWaterfallHook, log: any[] = []) {
      const queue = new Hook<[string]>(['name']);
      queue.tap('1', function (name) {
        log.push([name]);
        return 'hook-1';
      });
      queue.tap('2', function (name) {
        log.push([name]);
        return null;
      });
      queue.tap('3', function (name) {
        log.push([name]);
        return 'hook-3';
      });
      return [queue.call('hooks'), log];
    }
    const a = run(SyncWaterfallHook);
    // @ts-ignore
    const b = run(S);
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toMatchObject(b[1]);
  });

  it('call multi one params', function () {
    function run(Hook: typeof SyncWaterfallHook, log: any[] = []) {
      const queue = new Hook<[string]>(['name']);
      queue.tap('1', function (name) {
        log.push([name]);
        return 'hook-1';
      });
      queue.tap('2', function (name) {
        log.push([name]);
        return 'hook-2';
      });
      queue.tap('3', function (name) {
        log.push([name]);
        return 'hook-3';
      });
      return [queue.call('hooks'), log];
    }
    const a = run(SyncWaterfallHook);
    // @ts-ignore
    const b = run(S);
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toMatchObject(b[1]);
  });

  it('call multi two params', function () {
    function run(Hook: typeof SyncWaterfallHook, log: any[] = []) {
      const queue = new Hook<[string, number]>(['name', 'value']);
      queue.tap('1', function (name, value) {
        log.push([name, value]);
        return 'hook-1';
      });
      queue.tap('2', function (name, value) {
        log.push([name, value]);
        return 'hook-2';
      });
      queue.tap('3', function (name, value) {
        log.push([name, value]);
        return 'hook-3';
      });
      return [queue.call('hooks', 0), log];
    }
    const a = run(SyncWaterfallHook);
    // @ts-ignore
    const b = run(S);
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toMatchObject(b[1]);
  });

  it('call multi two array params', function () {
    function run(Hook: typeof SyncWaterfallHook, log: any[] = []) {
      const queue = new Hook<[string[], number[]]>(['name', 'value']);
      queue.tap('1', function (name, value) {
        log.push([name, value]);
        return 'hook-1';
      });
      queue.tap('2', function (name, value) {
        log.push([name, value]);
        return 'hook-2';
      });
      queue.tap('3', function (name, value) {
        log.push([name, value]);
        return 'hook-3';
      });
      return [queue.call(['hooks'], [0]), log];
    }
    const a = run(SyncWaterfallHook);
    // @ts-ignore
    const b = run(S);
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toMatchObject(b[1]);
  });

  it('call multi one array params', function () {
    function run(Hook: typeof SyncWaterfallHook, log: any[] = []) {
      const queue = new Hook<[string[]]>(['name']);
      queue.tap('1', function (name) {
        log.push([name]);
        return 'hook-1';
      });
      queue.tap('2', function (name) {
        log.push([name]);
        return 'hook-2';
      });
      queue.tap('3', function (name) {
        log.push([name]);
        return 'hook-3';
      });
      return [queue.call(['hooks']), log];
    }
    const a = run(SyncWaterfallHook);
    // @ts-ignore
    const b = run(S);
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toMatchObject(b[1]);
  });

  it('throw error validate waterfall hooks args', () => {
    expect(() => {
      new SyncWaterfallHook();
    }).toThrowError('Waterfall hooks must have at least one argument');
  });
});
