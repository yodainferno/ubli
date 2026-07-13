import { StateSchema } from 'app/providers/StoreProvider';
import { createIdle } from 'shared/api/types/apiResponse';
import { ValidateProfileError } from '../../types/profile';
import { getProfileValidateErrors } from './getProfileValidateError';

describe('getProfileReadOnly.test', () => {
    test('undefined', () => {
        const value = getProfileValidateErrors({
            profile: {
                data: createIdle(),
                validateErrors: undefined,
            },
        } as StateSchema);

        expect(value).toEqual([]);
    });

    test('happy path', () => {
        const value = getProfileValidateErrors({
            profile: {
                data: createIdle(),
                validateErrors: [ValidateProfileError.NO_DATA, ValidateProfileError.INCORRECT_AGE],
            },
        } as StateSchema);

        expect(value).toEqual([ValidateProfileError.NO_DATA, ValidateProfileError.INCORRECT_AGE]);
    });
});
