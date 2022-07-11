import { SyncLoopHook as S } from 'tapable';

import { SyncLoopHook } from '../src';

describe('SyncLoopHook', function () {
  it('call multi', function () {
    function run(Hook: typeof SyncLoopHook, log: any[] = []) {
      const queue = new Hook<[string, number]>(['name', 'value']);

      let count = 3;
      queue.tap('1', function (name, value) {
        log.push([name, value]);
        log.push(['count: ', count--]);
        if (count > 0) {
          return true;
        }
      });

      return [queue.call('hooks', 0), log];
    }

    const a = run(SyncLoopHook);
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
    function run(Hook: typeof SyncLoopHook, log: any[] = []) {
      const queue = new Hook<[string]>(['name']);

      let count = 3;
      queue.tap('1', function (name) {
        log.push([name]);
        log.push(['count: ', count--]);
        if (count > 0) {
          return true;
        }
      });

      return [queue.call('hooks'), log];
    }

    const a = run(SyncLoopHook);
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
    function run(Hook: typeof SyncLoopHook, log: any[] = []) {
      const queue = new Hook<[]>();

      let count = 3;
      queue.tap('1', function () {
        log.push(['count: ', count--]);
        if (count > 0) {
          return true;
        }
      });

      return [queue.call(), log];
    }

    const a = run(SyncLoopHook);
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
