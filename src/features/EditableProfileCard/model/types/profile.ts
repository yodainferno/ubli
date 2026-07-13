import { ApiResponse } from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';

export enum ValidateProfileError {
    INCORRECT_AUTH_DATA = 'INCORRECT_AUTH_DATA',
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA'
}

export type ProfileSchema = {
    data: ApiResponse<Profile, string>,
    form?: Profile,
    readonly: boolean,
    validateErrors?: ValidateProfileError[],
}
