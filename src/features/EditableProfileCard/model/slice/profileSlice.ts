import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createIdle, ResponseStatus } from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';
import { extraReducersBuilder } from 'shared/lib/extraReducersBuilder/extraReducersBuilder';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
    data: createIdle(),
    readonly: true,
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        onEdit: (state) => {
            state.readonly = false;
        },
        setForm: (state, action: PayloadAction<Profile | undefined>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        cancelEdit: (state) => {
            state.readonly = true;
            if (state.data.type === ResponseStatus.SUCCESS) {
                state.form = {
                    ...state.data.payload,
                };
            }
        },
    },
    extraReducers: (builder) => {
        extraReducersBuilder(
            builder,
            fetchProfileData,
            {
                fulfilled: (state, payload) => { state.form = payload; },
            },
        );
        extraReducersBuilder(
            builder,
            updateProfileData,
            {
                fulfilled: (state, payload) => {
                    state.form = payload;
                    state.readonly = true;
                },
            },
        );
    },
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
