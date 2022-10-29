import { describe, expect, test } from 'vitest';
import { Vector2 } from './vector2';

const getFixedPrecision = (value: number, precision = 0.0001): boolean => {
	return Math.abs(value) < precision;
};

describe('Vector2', () => {
	test('constructor', () => {
		const vector = new Vector2(1, 2);

		expect(vector.x).toBe(1);
		expect(vector.y).toBe(2);
	});

	test('static getter one', () => {
		expect(Vector2.one).toEqual(new Vector2(1, 1));
	});

	test('static getter zero', () => {
		expect(Vector2.zero).toEqual(new Vector2(0, 0));
	});

	test('static getter up', () => {
		expect(Vector2.up).toEqual(new Vector2(0, 1));
	});

	test('static getter down', () => {
		expect(Vector2.down).toEqual(new Vector2(0, -1));
	});

	test('static getter left', () => {
		expect(Vector2.left).toEqual(new Vector2(-1, 0));
	});

	test('static getter right', () => {
		expect(Vector2.right).toEqual(new Vector2(1, 0));
	});

	test('static method Add', () => {
		expect(Vector2.Add(new Vector2(1, 2), new Vector2(3, 4))).toEqual(new Vector2(4, 6));
	});

	test('static method Subtract', () => {
		expect(Vector2.Subtract(new Vector2(1, 2), new Vector2(3, 4))).toEqual(new Vector2(-2, -2));
	});

	test('static method Multiply', () => {
		expect(Vector2.Multiply(new Vector2(1, 2), new Vector2(3, 4))).toEqual(new Vector2(3, 8));
	});

	test('static method MultiplyScalar', () => {
		expect(Vector2.MultiplyScalar(new Vector2(1, 2), 3)).toEqual(new Vector2(3, 6));
	});

	test('static method Divide', () => {
		expect(Vector2.Divide(new Vector2(1, 2), new Vector2(3, 4))).toEqual(new Vector2(1 / 3, 2 / 4));
	});

	test('static method DivideScalar', () => {
		expect(Vector2.DivideScalar(new Vector2(1, 2), 3)).toEqual(new Vector2(1 / 3, 2 / 3));
	});

	test('static method Dot', () => {
		expect(Vector2.Dot(new Vector2(1, 2), new Vector2(3, 4))).toBe(11);
	});

	test('static method PerpendicularClockwise', () => {
		expect(Vector2.PerpendicularClockwise(new Vector2(1, 2))).toEqual(new Vector2(2, -1));
	});

	test('static method PerpendicularCounterClockwise', () => {
		expect(Vector2.PerpendicularCounterClockwise(new Vector2(1, 2))).toEqual(new Vector2(-2, 1));
	});

	test('static method Rotate', () => {
		const vector = new Vector2(1, 2);
		const radians = Math.PI;
		const result = Vector2.Rotate(vector, radians);

		expect(getFixedPrecision(result.x)).toEqual(getFixedPrecision(-1));
		expect(getFixedPrecision(result.y)).toEqual(getFixedPrecision(-2));
	});

	test('static method Negate', () => {
		expect(Vector2.Negate(new Vector2(1, 2))).toEqual(new Vector2(-1, -2));
	});

	test('getter x', () => {
		const vector = new Vector2(1, 2);

		expect(vector.x).toBe(1);
	});

	test('getter y', () => {
		const vector = new Vector2(1, 2);

		expect(vector.y).toBe(2);
	});

	test('setter x', () => {
		const vector = new Vector2(1, 2);

		vector.x = 3;

		expect(vector.x).toBe(3);

		vector.x = 4;

		expect(vector.x).toBe(4);
	});

	test('setter y', () => {
		const vector = new Vector2(1, 2);

		vector.y = 3;

		expect(vector.y).toBe(3);

		vector.y = 4;

		expect(vector.y).toBe(4);
	});

	test('getter magnitude', () => {
		const vector = new Vector2(3, 4);

		expect(vector.magnitude).toBe(5);
	});

	test('getter magnitudeSquared', () => {
		const vector = new Vector2(3, 4);

		expect(vector.magnitudeSquared).toBe(25);

		vector.x = 0;

		expect(vector.magnitudeSquared).toBe(16);
	});

	test('getter normalized', () => {
		const vector = new Vector2(3, 4);

		expect(vector.normalized).toEqual(new Vector2(3 / 5, 4 / 5));
	});

	test('method Add', () => {
		const vector = new Vector2(1, 2);

		vector.Add(new Vector2(3, 4));

		expect(vector).toEqual(new Vector2(4, 6));
	});

	test('method Subtract', () => {
		const vector = new Vector2(1, 2);

		vector.Subtract(new Vector2(3, 4));

		expect(vector).toEqual(new Vector2(-2, -2));
	});

	test('method Multiply', () => {
		const vector = new Vector2(1, 2);

		vector.Multiply(new Vector2(3, 4));

		expect(vector).toEqual(new Vector2(3, 8));
	});

	test('method MultiplyScalar', () => {
		const vector = new Vector2(1, 2);

		vector.MultiplyScalar(3);

		expect(vector).toEqual(new Vector2(3, 6));
	});

	test('method Divide', () => {
		const vector = new Vector2(1, 2);

		vector.Divide(new Vector2(3, 4));

		expect(vector).toEqual(new Vector2(1 / 3, 2 / 4));
	});

	test('method DivideScalar', () => {
		const vector = new Vector2(1, 2);

		vector.DivideScalar(3);

		expect(vector).toEqual(new Vector2(1 / 3, 2 / 3));
	});

	test('method Dot', () => {
		const vector = new Vector2(1, 2);

		expect(vector.Dot(new Vector2(3, 4))).toBe(11);
	});

	test('method PerpendicularClockwise', () => {
		const vector = new Vector2(1, 2);

		vector.PerpendicularClockwise();

		expect(vector).toEqual(new Vector2(2, -1));
	});

	test('method PerpendicularCounterClockwise', () => {
		const vector = new Vector2(1, 2);

		vector.PerpendicularCounterClockwise();

		expect(vector).toEqual(new Vector2(-2, 1));
	});

	test('method Rotate', () => {
		const vector = new Vector2(1, 2);
		const radians = Math.PI;

		vector.Rotate(radians);

		expect(getFixedPrecision(vector.x)).toEqual(getFixedPrecision(-1));
		expect(getFixedPrecision(vector.y)).toEqual(getFixedPrecision(-2));
	});

	test('method Negate', () => {
		const vector = new Vector2(1, 2);

		vector.Negate();

		expect(vector).toEqual(new Vector2(-1, -2));
	});

	test('method Equals', () => {
		const vector = new Vector2(1, 2);

		expect(vector.Equals(new Vector2(1, 2))).toBe(true);
		expect(vector.Equals(new Vector2(1, 3))).toBe(false);
		expect(vector.Equals(new Vector2(2, 2))).toBe(false);
		expect(vector.Equals(new Vector2(2, 3))).toBe(false);
	});

	test('method ToString', () => {
		const vector = new Vector2(1, 2);

		expect(vector.ToString()).toBe('(1.00000000000000, 2.00000000000000)');
		expect(vector.ToString(0)).toBe('(1, 2)');
		expect(vector.ToString(1)).toBe('(1.0, 2.0)');
		expect(vector.ToString(2)).toBe('(1.00, 2.00)');
	});
});
