import axios from 'axios';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

const profileData: Profile = {
    username: '123',
    firstname: 'John',
    lastname: 'Doe',
    age: 42,
    country: Country.Armenia,
    currency: Currency.EUR,
    city: 'San Francisco',
};

describe('fetchProfileData.test', () => {
    test('success', async () => {
        mockedAxios.get.mockResolvedValue(Promise.resolve({ data: { ...profileData } }));
        //
        const thunk = new TestAsyncThunk(fetchProfileData);
        const result = await thunk.calcThunk();
        //
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({ ...profileData });
    });

    test('403', async () => {
        mockedAxios.get.mockResolvedValue(Promise.resolve({ status: 403 }));
        //
        const thunk = new TestAsyncThunk(fetchProfileData);
        const result = await thunk.calcThunk();
        //
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
