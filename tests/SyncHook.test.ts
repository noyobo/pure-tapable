import { describe, expect, it } from 'vitest';
import { SyncHook as S } from 'tapable';

import { SyncHook } from '../src';

describe('SyncHook', function () {
  it('call multi', function () {
    function run(Hook: typeof SyncHook, log: any[] = []) {
      const queue = new Hook<[string, number]>(['name', 'value']);
      queue.tap('1', (name, value) => {
        log.push([name, value, 1]);
      });
      queue.tap('2', (name, value) => {
        log.push([name, value, 2]);
      });
      queue.tap('3', (name, value) => {
        log.push([name, value, 3]);
      });
      return [queue.call('hooks', 0), log];
    }
    const a = run(SyncHook);
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
    function run(Hook: typeof SyncHook, log: any[] = []) {
      const queue = new Hook<[string]>(['name']);
      queue.tap('1', (name) => {
        log.push([name, 1]);
      });
      queue.tap('2', (name) => {
        log.push([name, 2]);
      });
      queue.tap('3', (name) => {
        log.push([name, 3]);
      });
      return [queue.call('hooks'), log];
    }
    const a = run(SyncHook);
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
    function run(Hook: typeof SyncHook, log: any[] = []) {
      const queue = new Hook<[]>();
      queue.tap('1', () => {
        log.push([1]);
      });
      queue.tap('2', () => {
        log.push([2]);
      });
      queue.tap('3', () => {
        log.push([3]);
      });
      return [queue.call(), log];
    }
    const a = run(SyncHook);
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
