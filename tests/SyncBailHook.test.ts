import { describe, expect, it } from 'vitest';
import { SyncBailHook as S } from 'tapable';

import { SyncBailHook } from '../src';

describe('SyncBailHook', function () {
  it('call multi', function () {
    function run(Hook: typeof SyncBailHook, log: any[] = []) {
      const queue = new Hook<[string, number]>(['name', 'value']);
      queue.tap('1', function (name, value) {
        log.push([name, value, 1]);
      });
      queue.tap('2', function (name, value) {
        log.push([name, value, 2]);
        return true;
      });
      queue.tap('3', function (name, value) {
        log.push([name, value, 3]);
      });

      return [queue.call('hooks', 0), log];
    }

    const a = run(SyncBailHook);
    // @ts-ignore
    const b = run(S);
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toEqual(b[1]);
  });

  it('call single', function () {
    function run(Hook: typeof SyncBailHook, log: any[] = []) {
      const queue = new Hook<[string]>(['name']);
      queue.tap('1', function (name) {
        log.push([name, 1]);
      });
      queue.tap('2', function (name) {
        log.push([name, 2]);
        return true;
      });
      queue.tap('3', function (name) {
        log.push([name, 3]);
      });

      return [queue.call('hooks'), log];
    }

    const a = run(SyncBailHook);
    // @ts-ignore
    const b = run(S);
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toEqual(b[1]);
  });

  it('call empty', function () {
    function run(Hook: typeof SyncBailHook, log: any[] = []) {
      const queue = new Hook<[]>();
      queue.tap('1', function () {
        log.push([1]);
      });
      queue.tap('2', function () {
        log.push([2]);
        return true;
      });
      queue.tap('3', function () {
        log.push([3]);
      });

      return [queue.call(), log];
    }

    const a = run(SyncBailHook);
    // @ts-ignore
    const b = run(S);
    expect(a[0]).toMatchSnapshot();
    expect(b[0]).toMatchSnapshot();
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toMatchSnapshot();
    expect(b[1]).toMatchSnapshot();
    expect(a[1]).toEqual(b[1]);
  });
});
