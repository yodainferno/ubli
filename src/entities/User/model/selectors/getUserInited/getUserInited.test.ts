import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUserInited } from './getUserInited';

describe('getUserInited.test', () => {
    test('with getUserInited data', () => {
        // arrange
        const state: DeepPartial<StateSchema> = {
            user: {
                _inited: true,
            },
        };
        // act
        const value = getUserInited(state as StateSchema);

        // assert
        expect(value).toEqual(true);
    });

    test('w/o getUserInited data', () => {
        // arrange
        const state: DeepPartial<StateSchema> = {
            user: {},
        };
        // act
        const value = getUserInited(state as StateSchema);

        // assert
        expect(value).toEqual(false);
    });
});
