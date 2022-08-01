import memoize, { Memoizerific } from '../src/memoizerific';

describe('null args', () => {
  let memoizedFn: Memoizerific<any>;
  const arg1: any = null;
  const arg2: any = undefined;
  const arg3 = NaN; // important to test since NaN does not equal NaN

  beforeEach(() => {
    memoizedFn = memoize(50)((a: any, b: any, c: any) => '');
    memoizedFn(arg1, arg2, arg3);
  });

  it('should not be memoized', () => {
    expect(memoizedFn.wasMemoized).toEqual(false);
    expect(memoizedFn.lru.length).toEqual(1);
  });

  it('should be memoized', () => {
    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(1);
  });

  it('should have multiple cached items', () => {
    memoizedFn(arg1, arg2, arg3);
    expect(memoizedFn.wasMemoized).toEqual(true);
    memoizedFn(arg1, arg2, 1);
    expect(memoizedFn.wasMemoized).toEqual(false);
    expect(memoizedFn.lru.length).toEqual(2);
  });

  it('should not confuse undefined and null', () => {
    memoizedFn(arg2, arg1, arg3);
    expect(memoizedFn.wasMemoized).toEqual(false);
    expect(memoizedFn.lru.length).toEqual(2);
  });
});
