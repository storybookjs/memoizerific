import memoize, { Memoizerific } from '../src/memoizerific';

describe('no args', () => {
  let memoizedFn: Memoizerific<() => string>;

  beforeEach(() => {
    memoizedFn = memoize(50)(() => 'no args');
    memoizedFn();
  });

  it('should be memoized', () => {
    let res = memoizedFn();
    expect(res).toEqual('no args');
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(1);

    res = memoizedFn();
    expect(res).toEqual('no args');
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(1);
  });
});
