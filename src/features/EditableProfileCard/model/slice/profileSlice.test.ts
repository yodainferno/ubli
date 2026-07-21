import { DeepPartial } from '@reduxjs/toolkit';
import { createIdle, createLoading, createSuccess } from 'shared/api/types/apiResponse';
import { profileActions, profileReducer } from './profileSlice';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { Profile } from '../../../../entities/Profile';
import { Country } from '../../../../entities/Country';
import { Currency } from '../../../../entities/Currency';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const profileData: Profile = {
    username: '123',
    firstname: 'John',
    lastname: 'Doe',
    age: 42,
    country: Country.Armenia,
    currency: Currency.EUR,
    city: 'San Francisco',
};

describe('profileSlice.test', () => {
    test('onEdit', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: true };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.onEdit(),
        )).toEqual({ readonly: false });
    });
    test('cancelEdit', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            validateErrors: [ValidateProfileError.NO_DATA],
            data: createSuccess(profileData),
            form: {
                ...profileData,
                lastname: undefined,
                firstname: undefined,
            },
        };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit(),
        )).toEqual({
            readonly: true,
            validateErrors: [],
            data: createSuccess(profileData),
            form: profileData,
        });
    });

    test('setForm', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: {
                ...profileData,
                lastname: undefined,
                firstname: undefined,
            },
        };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setForm({
                lastname: 'opop',
            }),
        )).toEqual({
            form: {
                ...profileData,
                lastname: 'opop',
                firstname: undefined,
            },
        });
    });

    test('fetchProfileData.fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: createLoading(),
            readonly: true,
        };

        expect(profileReducer(
            state as ProfileSchema,
            fetchProfileData.fulfilled(profileData, '', '1'),
        )).toEqual({
            data: createSuccess(profileData),
            form: profileData,
            readonly: true,
        });
    });

    // тестирует extrareducers с логикой
    test('updateProfileData.pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: createIdle(),
            readonly: false,
            validateErrors: [ValidateProfileError.NO_DATA],
        };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending,
        )).toEqual({
            data: createLoading(),
            readonly: false,
            validateErrors: [],
        });
    });

    test('updateProfileData.fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            data: createSuccess({
                ...profileData,
                lastname: 'qqqqqqqq',
            }),
            form: profileData,
            validateErrors: [ValidateProfileError.NO_DATA],
        };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(profileData, '123', ''),
        )).toEqual({
            readonly: true,
            form: profileData,
            data: createSuccess(profileData),
            validateErrors: [],
        });
    });
});
