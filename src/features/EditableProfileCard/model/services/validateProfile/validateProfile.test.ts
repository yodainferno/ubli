import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { validateProfile } from './validateProfile';
import { ValidateProfileError } from '../../types/profile';

const profile: Profile = {
    username: 'admin',
    firstname: 'admin',
    lastname: 'admin',
    age: 50,
    country: Country.Armenia,
};

describe('ValidateProfile', () => {
    test('profile valid', () => {
        expect(validateProfile({ ...profile })).toEqual([]);
    });

    test('auth and user errors', () => {
        expect(validateProfile({
            ...profile,
            username: undefined,
            firstname: undefined,
        })).toEqual([
            ValidateProfileError.INCORRECT_AUTH_DATA,
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('small age - valid', () => {
        expect(validateProfile({
            ...profile,
            age: 1,
        })).toEqual([]);
    });
    test('small age - error', () => {
        expect(validateProfile({
            ...profile,
            age: 0,
        })).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
    test('not age - error', () => {
        expect(validateProfile({
            ...profile,
            age: undefined,
        })).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
    test('float age errors', () => {
        expect(validateProfile({
            ...profile,
            age: 13.3,
        })).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
    test('country errors', () => {
        expect(validateProfile({
            ...profile,
            country: undefined,
        })).toEqual([
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
