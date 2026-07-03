import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue.test', () => {
    test('should return the counter value', () => {
        // arrange
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };

        // act
        const value = getCounterValue(state as StateSchema);

        // assert
        expect(value).toEqual(10);
    });
});
