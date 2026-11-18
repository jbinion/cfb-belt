import { expect, test } from 'vitest';
import reignDays from '../../src/lib/reignDays';

const now = new Date('2026-11-18T12:00:00.000Z');

test('counts whole days between start and end', () => {
	expect(reignDays('2026-10-30T23:30:00.000Z', '2026-11-15T00:00:00.000Z')).toBe(15);
	expect(reignDays('1869-11-06T00:00:00.000Z', '1869-11-13T00:00:00.000Z')).toBe(7);
});

test('a reign with no end runs until now', () => {
	expect(reignDays('2026-11-15T00:00:00.000Z', null, now)).toBe(3);
	expect(reignDays('2026-11-15T00:00:00.000Z', undefined, now)).toBe(3);
});

test('a reign that starts and ends the same day is 0 days, never negative', () => {
	expect(reignDays('2026-11-15T00:00:00.000Z', '2026-11-15T00:00:00.000Z')).toBe(0);
	expect(reignDays('2026-11-15T00:00:00.000Z', '2026-11-14T00:00:00.000Z')).toBe(0);
});
