import { Profile } from 'entities/Profile';
import { Country } from '../../../../../entities/Country';
import { validateProfile } from './validateProfile';
import { ValidateProfileError } from '../../types/profile';

describe('ValidateProfile', () => {
    test('profile valid', () => {
        const profile: Profile = {
            username: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            age: 50,
            country: Country.Armenia,
        };

        expect(validateProfile(profile)).toEqual([]);
    });

    test('auth and user errors', () => {
        const profile: Profile = {
            lastname: 'lalala',
            age: 50,
            country: Country.Armenia,
        };

        expect(validateProfile(profile)).toEqual([
            ValidateProfileError.INCORRECT_AUTH_DATA,
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('small age - valid', () => {
        const profile: Profile = {
            username: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            age: 1,
            country: Country.Armenia,
        };

        expect(validateProfile(profile)).toEqual([
        ]);
    });
    test('small age - error', () => {
        const profile: Profile = {
            username: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            age: 0,
            country: Country.Armenia,
        };

        expect(validateProfile(profile)).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
    test('not age - error', () => {
        const profile: Profile = {
            username: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            country: Country.Armenia,
        };

        expect(validateProfile(profile)).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
    test('float age errors', () => {
        const profile: Profile = {
            username: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            age: 34.4,
            country: Country.Armenia,
        };

        expect(validateProfile(profile)).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
    test('country errors', () => {
        const profile: Profile = {
            username: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            age: 50,
        };

        expect(validateProfile(profile)).toEqual([
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
