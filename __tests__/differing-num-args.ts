import memoize, { Memoizerific } from '../src/memoizerific';

describe('different number of args between calls', () => {
  let memoizedFn: Memoizerific<any>;
  const arg1 = 1;
  const arg2 = 2;
  const arg3 = 3;
  const arg4 = 4;
  const arg5 = 5;

  beforeEach(() => {
    memoizedFn = memoize(50)((...args: any[]) => `memoized result ${args.length}`);
    memoizedFn(arg1, arg2, arg3);
  });

  it('right number of args', () => {
    const res = memoizedFn(arg1, arg2, arg4);
    expect(res).toEqual('memoized result 3');
    expect(memoizedFn.wasMemoized).toEqual(false);
    expect(memoizedFn.lru.length).toEqual(2);
  });

  it('one more arg', () => {
    expect(() => {
      memoizedFn(arg1, arg2, arg3, arg4);
    }).toThrow();
  });

  it('several more args', () => {
    expect(() => {
      memoizedFn(arg1, arg2, arg3, arg4, arg5);
    }).toThrow();
  });

  it('one fewer args', () => {
    expect(() => {
      memoizedFn(arg1, arg2);
    }).toThrow();
  });

  it('several fewer args', () => {
    expect(() => {
      memoizedFn(arg1);
    }).toThrow();
  });
});
