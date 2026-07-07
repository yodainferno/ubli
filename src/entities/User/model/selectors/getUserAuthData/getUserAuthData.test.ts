import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData.test', () => {
    test('with getUserAuthData data', () => {
        // arrange
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: '1',
                    username: 'username',
                },
            },
        };
        // act
        const value = getUserAuthData(state as StateSchema);

        // assert
        expect(value).toEqual({
            id: '1',
            username: 'username',
        });
    });
});
