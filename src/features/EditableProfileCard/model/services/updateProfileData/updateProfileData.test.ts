import axios from 'axios';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from './updateProfileData';
import { createSuccess } from '../../../../../shared/api/types/apiResponse';
import { ValidateProfileError } from '../../types/profile';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

const profileData: Profile = {
    id: '123',
    username: '123',
    firstname: 'John',
    lastname: 'Doe',
    age: 42,
    country: Country.Armenia,
    currency: Currency.EUR,
    city: 'San Francisco',
};

describe('updateProfileData.test', () => {
    test('success', async () => {
        mockedAxios.put.mockResolvedValue(Promise.resolve({ data: { ...profileData } }));
        //
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...profileData, lastname: 'bobobo' },
            },
        });
        const result = await thunk.calcThunk('123');
        //
        expect(mockedAxios.put).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({ ...profileData });
    });

    test('403', async () => {
        mockedAxios.put.mockResolvedValue(Promise.resolve({ status: 403 }));
        //
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...profileData, lastname: 'bobobo' },
            },
        });
        const result = await thunk.calcThunk('123');
        //
        expect(mockedAxios.put).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('API ERROR');
    });

    test('validation error', async () => {
        mockedAxios.put.mockResolvedValue(Promise.resolve({ status: 403 }));
        //
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...profileData, lastname: undefined },
            },
        });
        const result = await thunk.calcThunk('123');
        //
        expect(mockedAxios.put).toHaveBeenCalledTimes(0);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
});
