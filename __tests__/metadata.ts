import memoize, { Memoizerific } from '../src/memoizerific';

describe('wasMemoized', () => {
  let memoizedFn: Memoizerific<(a: number, b: number, c: number) => number>;

  beforeEach(() => {
    memoizedFn = memoize(50)((arg1, arg2, arg3) => arg1 + arg2 + arg3);
  });

  it('should be false before any invocations', () => {
    expect(memoizedFn.wasMemoized).toEqual(false);
  });

  it('should be false after one invocation', () => {
    memoizedFn(1, 2, 3);
    expect(memoizedFn.wasMemoized).toEqual(false);
  });

  it('should be true', () => {
    memoizedFn(1, 2, 3);
    memoizedFn(1, 2, 3);
    expect(memoizedFn.wasMemoized).toEqual(true);
  });

  it('should be false', () => {
    memoizedFn(1, 2, 3);
    memoizedFn(1, 2, 3);
    memoizedFn(4, 5, 6);
    expect(memoizedFn.wasMemoized).toEqual(false);
  });
});

describe('limit', () => {
  let memoizedFn: Memoizerific<any>;

  beforeEach(() => {
    memoizedFn = memoize(43)((arg1: any, arg2: any, arg3: any) => arg1.num * arg2.num);
  });

  it('should be correct after no invocations', () => {
    expect(memoizedFn.limit).toEqual(43);
  });

  it('should be correct after one invocation', () => {
    memoizedFn(1, 2, 3);
    expect(memoizedFn.limit).toEqual(43);
  });

  it('should be correct after multiple invocations', () => {
    memoizedFn(1, 2, 3);
    memoizedFn(4, 5, 6);
    expect(memoizedFn.limit).toEqual(43);
  });
});
