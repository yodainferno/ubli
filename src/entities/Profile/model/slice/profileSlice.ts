import { createSlice } from '@reduxjs/toolkit';
import {
    createError, createIdle, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';
import { fetchProfileData } from 'entities/Profile';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    data: createIdle(),
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.data = createLoading();
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.data = createSuccess(action.payload);
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.data = createError<string>(action.payload ?? '');
            });
    },
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
