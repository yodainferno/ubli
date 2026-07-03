import { counterReducer, counterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice.test', () => {
    test('decrement', () => {
        // arrange
        const state: CounterSchema = { value: 10 };

        // act
        const value = counterReducer(state, counterActions.decrement());

        // assert
        expect(value).toEqual({ value: 9 });
    });

    test('increment', () => {
        // arrange
        const state: CounterSchema = { value: 10 };

        // act
        const value = counterReducer(state, counterActions.increment());

        // assert
        expect(value).toEqual({ value: 11 });
    });

    test('should work with empty state', () => {
        // arrange
        const state = undefined;

        // act
        const value = counterReducer(state, counterActions.increment());

        // assert
        expect(value).toEqual({ value: 1 });
    });
});
