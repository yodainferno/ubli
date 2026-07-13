import { StateSchema } from 'app/providers/StoreProvider';
import { createIdle } from 'shared/api/types/apiResponse';
import { getProfileReadOnly } from './getProfileReadOnly';

describe('getProfileReadOnly.test', () => {
    test('undefined', () => {
        const value = getProfileReadOnly({
            profile: {
                data: createIdle(),
                readonly: undefined,
            },
        } as StateSchema);

        expect(value).toEqual(true);
    });

    test('true', () => {
        const value = getProfileReadOnly({
            profile: {
                data: createIdle(),
                readonly: true,
            },
        } as StateSchema);

        expect(value).toBe(true);
    });

    test('false', () => {
        const value = getProfileReadOnly({
            profile: {
                data: createIdle(),
                readonly: false,
            },
        } as StateSchema);

        expect(value).toBe(false);
    });
});
