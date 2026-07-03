import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter.test', () => {
    // проверяем что селектор возвращает нужный участок state
    test('should return the counter', () => {
        // arrange
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };

        // act
        const value = getCounter(state as StateSchema);

        // assert
        expect(value).toEqual({ value: 10 });
    });
});
