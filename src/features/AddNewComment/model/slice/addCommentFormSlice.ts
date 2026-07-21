import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createError, createIdle } from 'shared/api/types/apiResponse';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    data: createIdle(),
};
export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string | undefined>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProfileData.pending, (state) => {
    //             state.data = createLoading();
    //         })
    //         .addCase(fetchProfileData.fulfilled, (state, action) => {
    //             state.data = createSuccess(action.payload);
    //         })
    //         .addCase(fetchProfileData.rejected, (state, action) => {
    //             state.data = createError(action.payload);
    //         });
    //
    // },
});

export const { reducer: addCommentFormReducer } = addCommentFormSlice;
export const { actions: addCommentFormActions } = addCommentFormSlice;
