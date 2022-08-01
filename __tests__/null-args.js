import Memoizerific  from '../src/memoizerific';

describe("null args", () => {
	var memoizedFn,
		arg1 = null,
		arg2 = undefined,
		arg3 = NaN; // important to test since NaN does not equal NaN

	beforeEach(function() {
		memoizedFn = Memoizerific(50)(function(arg1, arg2, arg3) {
			return '';
		});
		memoizedFn(arg1, arg2, arg3);
	});

	it("should be a map", () => {
		expect(memoizedFn.cache instanceof Map).toEqual(true);
	});

	it("should not be memoized", () => {
		expect(memoizedFn.wasMemoized).toEqual(false);
		expect(memoizedFn.lru.length).toEqual(1);
	});

	it("should be memoized", () => {
		memoizedFn(arg1, arg2, arg3);
		expect(memoizedFn.wasMemoized).toEqual(true);
		expect(memoizedFn.lru.length).toEqual(1);
	});

	it("should have multiple cached items", () => {
		memoizedFn(arg1, arg2, arg3);
		expect(memoizedFn.wasMemoized).toEqual(true);
		memoizedFn(arg1, arg2, 1);
		expect(memoizedFn.wasMemoized).toEqual(false);
		expect(memoizedFn.lru.length).toEqual(2);
	});

	it("should not confuse undefined and null", () => {
		memoizedFn(arg2, arg1, arg3);
		expect(memoizedFn.wasMemoized).toEqual(false);
		expect(memoizedFn.lru.length).toEqual(2);
	});
});
