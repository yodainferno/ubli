import { toNumberWithFallBack } from './toNumberWithFallBack';

describe('toNumberWithFallBack', () => {
    test('happy path - number', () => {
        const result = toNumberWithFallBack(123);
        expect(result).toBe(123);
    });

    test('happy path - string', () => {
        const result = toNumberWithFallBack('123');
        expect(result).toBe(123);
    });

    test('happy path - allow empty string', () => {
        const result = toNumberWithFallBack('');
        expect(result).toBe(null);
    });

    test('fallback - bad number', () => {
        const result = toNumberWithFallBack('aaaa', 123);
        expect(result).toBe(123);
    });

    test('fallback - no fallback data, bad number', () => {
        const result = toNumberWithFallBack('aaaa');
        expect(result).toBe(0);
    });
});
