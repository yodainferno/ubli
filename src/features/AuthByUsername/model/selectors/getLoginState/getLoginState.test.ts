import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { createIDLE, ResponseStatus } from 'shared/api/types/apiResponse';
import { getLoginState } from './getLoginState';

describe('getLoginState.test', () => {
    test('with loginForm data', () => {
        // arrange
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'username',
                password: 'password',
                status: createIDLE(),
            },
        };
        // act
        const value = getLoginState(state as StateSchema);

        // assert
        expect(value.status.type).toEqual(ResponseStatus.IDLE);
        expect(value.username).toEqual('username');
        expect(value.password).toEqual('password');
    });
    test('without loginForm data', () => {
        // arrange
        const state: DeepPartial<StateSchema> = {
            loginForm: undefined,
        };
        // act
        const value = getLoginState(state as StateSchema);

        // assert
        expect(value.status.type).toEqual(ResponseStatus.IDLE);
        expect(value.username).toEqual('');
        expect(value.password).toEqual('');
    });
});
