import { AssertionError } from 'assert'

export declare function assert(value: unknown): asserts value

export function assertIsNotNull<T>(val: T): asserts val is NonNullable<T> {
	if (val !== null) return

	throw new AssertionError({
		message: 'Expected value to be non nullable value',
	})
}
