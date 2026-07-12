import {
    ApiResponse, createError, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';
import type { ActionReducerMapBuilder, AsyncThunk, Draft } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

type BaseResponseSchema<T> = {
    data: ApiResponse<T, string>,
}

type ResponseTypeFromSchema<SchemaType extends BaseResponseSchema<unknown>> =
    SchemaType['data'] extends ApiResponse<infer ResponseType, string>
        ? ResponseType
        : never

export const extraReducersBuilder = <
    SchemaType extends BaseResponseSchema<unknown>
>(
        builder: ActionReducerMapBuilder<SchemaType>,
        service: AsyncThunk<ResponseTypeFromSchema<SchemaType>, void, ThunkConfig<string>>,
        options?: {
            fulfilled?: (
                state: Draft<SchemaType>,
                payload: ResponseTypeFromSchema<SchemaType>
            ) => void,
            rejected?: (state: Draft<SchemaType>, payload?: string) => void,
        },
    ) => builder
        .addCase(service.pending, (state) => {
            state.data = createLoading();
        })
        .addCase(service.fulfilled, (state, action) => {
            state.data = createSuccess(action.payload) as Draft<SchemaType>['data'];
            options?.fulfilled?.(state, action.payload);
        })
        .addCase(service.rejected, (state, action) => {
            state.data = createError<string>(action.payload ?? '');
            options?.rejected?.(state, action.payload);
        });
