import Memoizerific from '../src/memoizerific';

describe('no args', () => {
  var memoizedFn,
    res,
    arg1 = null,
    arg2 = undefined,
    arg3 = NaN; // important to test since NaN does not equal NaN

  beforeEach(function () {
    memoizedFn = Memoizerific(50)(function () {
      return 'no args';
    });
    memoizedFn();
  });

  it('should be a map', () => {
    expect(memoizedFn.cache instanceof Map).toEqual(true);
  });

  it('should be memoized', () => {
    res = memoizedFn();
    expect(res).toEqual('no args');
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(1);

    res = memoizedFn();
    expect(res).toEqual('no args');
    expect(memoizedFn.wasMemoized).toEqual(true);
    expect(memoizedFn.lru.length).toEqual(1);
  });
});
