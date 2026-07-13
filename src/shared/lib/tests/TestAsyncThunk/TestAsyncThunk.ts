/// <reference types="jest" />

import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { AsyncThunkAction, DeepPartial } from '@reduxjs/toolkit';
import axios from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<Return, Arg, ThunkConfig<RejectedValue>>

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);
    }

    async calcThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, { api: axios, navigate: jest.fn() });
        return result;
    }
}
