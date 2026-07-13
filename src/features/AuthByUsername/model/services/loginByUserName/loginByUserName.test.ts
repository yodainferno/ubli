import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUserName } from './loginByUserName';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUserName.test', () => {
    test('success', async () => {
        const userValue = { id: '1', username: '123' };
        mockedAxios.post.mockResolvedValue(Promise.resolve({ data: userValue }));
        //
        const thunk = new TestAsyncThunk(loginByUserName);
        const result = await thunk.calcThunk({ username: 'admin', password: '123123' });
        //
        expect(mockedAxios.post).toHaveBeenCalledTimes(1); // был вызван post-запрос
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // был вызван dispatch
        expect(result.meta.requestStatus).toBe('fulfilled'); // promise завершен успешно
    });

    test('403', async () => {
        mockedAxios.post.mockResolvedValue(Promise.resolve({ status: 403 }));
        //
        const thunk = new TestAsyncThunk(loginByUserName);
        const result = await thunk.calcThunk({ username: 'admin', password: '123123' });
        //
        expect(mockedAxios.post).toHaveBeenCalledTimes(1); // был вызван post-запрос
        expect(thunk.dispatch).toHaveBeenCalledTimes(2); // был вызван dispatch 2 раза
        expect(result.meta.requestStatus).toBe('rejected'); // promise завершен ошибкой
        expect(result.payload).toEqual('error'); //
    });
});
