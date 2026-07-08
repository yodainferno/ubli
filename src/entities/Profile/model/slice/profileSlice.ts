import { createSlice } from '@reduxjs/toolkit';
import { createIdle } from 'shared/api/types/apiResponse';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = createIdle();
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
