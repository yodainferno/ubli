import { Profile } from 'entities/Profile';
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/profile';

export const validateProfile = (profile?: Profile): ValidateProfileError[] => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const {
        username,
        firstname,
        lastname,
        age,
        country,
    } = profile;

    const errors: ValidateProfileError[] = [];

    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_AUTH_DATA);
    }

    if (!firstname || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }
    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_COUNTRY);
    }

    return errors;
};
