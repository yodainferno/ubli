import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createError,
    createIdle, createSuccess, ResponseStatus,
} from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';
import { extraReducersBuilder } from 'shared/lib/extraReducersBuilder/extraReducersBuilder';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
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
            state.validateErrors = [];
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
        builder
            .addCase(updateProfileData.pending, (state) => {
                state.validateErrors = [];
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.readonly = true;
                state.validateErrors = [];
                state.form = action.payload;
                state.data = createSuccess(action.payload);
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.validateErrors = action.payload as ValidateProfileError[];
                    return;
                }

                state.data = createError(action.payload ?? '');
            });
    },
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
