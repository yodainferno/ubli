import {
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { PageSchema } from 'widgets/Page';

const initialState: PageSchema = {
    scroll: {},
};

const pageSlice = createSlice({
    name: 'pageSlice',
    initialState,
    reducers: {
        setScrollPosition: (
            state: PageSchema,
            action: PayloadAction<{
                path: string,
                position: number,
            }>,
        ) => {
            const { path, position } = action.payload;
            state.scroll[path] = position;
        },
    },
});

export const { reducer: pageReducer } = pageSlice;
export const { actions: pageActions } = pageSlice;
