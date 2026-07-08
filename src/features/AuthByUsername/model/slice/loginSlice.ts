import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createError, createIdle, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
    username: 'admin',
    password: '123',
    status: createIdle(),
};
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUserName.pending, (state, action) => {
                state.status = createLoading();
            })
            .addCase(loginByUserName.fulfilled, (state, action) => {
                state.status = createSuccess(action.payload);
            })
            .addCase(loginByUserName.rejected, (state, action) => {
                state.status = createError<string>(action.payload ?? '');
            });
    },
});

export const { reducer: loginReducer } = loginSlice;
export const { actions: loginActions } = loginSlice;
