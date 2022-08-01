import memoize, { Memoizerific } from '../src/memoizerific';

describe('complexArgs', () => {
  const arg1 = { a: { b: 3 }, num: 3 };
  const arg2 = { c: { d: 3 }, num: 7 };
  const arg3 = [
    { f: { g: 3 }, num: 11 },
    { h: { i: 3 }, num: 4 },
    { j: { k: 3 }, num: 6 },
  ];

  let memoizedFn: Memoizerific<(...args: any[]) => any>;

  beforeEach(() => {
    memoizedFn = memoize(50)((a: any, b: any, c: any) => a.num * b.num);
    memoizedFn(arg1, arg2, arg3);
  });

  it('should be map', () => {
    expect(memoizedFn.cache instanceof Map).toEqual(true);
  });

  it('should not be memoized', () => {
    const a1 = { a: 1 };
    memoizedFn = memoize(50)((input: any) => input);

    memoizedFn(arg1);
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn(a1);
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn(a1);
    expect(memoizedFn.wasMemoized).toEqual(true);

    memoizedFn({ a: 1 });
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn({ a: 1 });
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn({ a: 1 });
    expect(memoizedFn.wasMemoized).toEqual(false);

    memoizedFn(a1);
    expect(memoizedFn.wasMemoized).toEqual(true);

    expect(memoizedFn.lru.length).toEqual(5);
  });

  it('should be memoized', () => {
    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(1);
  });

  it('should have multiple cached items', () => {
    memoizedFn(arg1, arg2, arg3);
    memoizedFn(arg1, arg2, 1);
    expect(memoizedFn.wasMemoized).toEqual(false);
    expect(memoizedFn.lru.length).toEqual(2);
  });
});
