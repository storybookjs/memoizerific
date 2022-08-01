import memoize, { Memoizerific } from '../src/memoizerific';

describe('surpassed limit', () => {
  let memoizedFn: Memoizerific<any>;
  const arg1 = { a: { b: 3 }, num: 3 };
  const arg2 = { c: { d: 3 }, num: 7 };
  const arg3 = [
    { f: { g: 3 }, num: 11 },
    { h: { i: 3 }, num: 4 },
    { j: { k: 3 }, num: 6 },
  ];

  beforeEach(() => {
    memoizedFn = memoize(2)((a: any, b: any, c: any) => a.num * b.num);
    memoizedFn(arg1, arg2, arg3);
  });

  it('should replace original memoized', () => {
    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(1);

    memoizedFn(1, 1, 1);
    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);

    memoizedFn(1, 1, 1);
    expect(memoizedFn.wasMemoized).toEqual(true);
    memoizedFn(2, 2, 2);
    expect(memoizedFn.wasMemoized).toEqual(false);
    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(false);
    expect(memoizedFn.lru.length).toEqual(2);

    memoizedFn(2, 2, 2);
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(2);

    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(2);
  });

  it('should move original to most recent', () => {
    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);

    memoizedFn(1, 1, 1);
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);

    memoizedFn(2, 2, 2);
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);

    memoizedFn(3, 3, 3);
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(2);
  });
});
