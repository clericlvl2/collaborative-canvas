import { isExist } from './utils.ts';

describe('isExist', () => {
    test('should return True for truthy values', () => {
        expect(isExist(123)).toBe(true);
        expect(isExist([])).toBe(true);
        expect(isExist(new Set())).toBe(true);
    });

    test('should return True for specific falsy Values', () => {
        expect(isExist(0)).toBe(true);
        expect(isExist('')).toBe(true);
        expect(isExist(false)).toBe(true);
    });

    test('should return False for nullish values', () => {
        expect(isExist(undefined)).toBe(false);
        expect(isExist(null)).toBe(false);
    });
});
