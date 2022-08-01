import memoize, { Memoizerific } from '../src/memoizerific';

describe('fibonacci', () => {
  function fibonacci(n: number): number {
    if (n < 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  }

  const fibonacciMemoized: Memoizerific<typeof fibonacci> = memoize(50)((n) => {
    if (n < 2) {
      return 1;
    }
    return fibonacciMemoized(n - 2) + fibonacciMemoized(n - 1);
  });

  let fibonacciTime = process.hrtime();
  const fibonacciResult = fibonacci(40);
  fibonacciTime = process.hrtime(fibonacciTime);

  let fibonacciMemoizedTime = process.hrtime();
  const fibonacciMemoizedResult = fibonacciMemoized(40);
  fibonacciMemoizedTime = process.hrtime(fibonacciMemoizedTime);

  const ratioDifference =
    (fibonacciTime[0] * 1000000000 + fibonacciTime[1]) /
    (fibonacciMemoizedTime[0] * 1000000000 + fibonacciMemoizedTime[1]);

  it('should equal non-memoized result', () => {
    expect(fibonacciResult).toEqual(fibonacciMemoizedResult);
  });
  it('should have proper lru length', () => {
    expect(fibonacciMemoized.lru.length).toEqual(41);
  });
  it('should be at least 10x faster', () => {
    expect(ratioDifference).toBeGreaterThan(10);
  });
});
