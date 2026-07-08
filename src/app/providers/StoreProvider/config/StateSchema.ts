import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import type { To } from '@remix-run/router';
import type { NavigateOptions } from 'react-router/dist/lib/context';
import { AxiosInstance } from 'axios';

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema

    // асихронные редьюсеры
    loginForm?: LoginSchema,
    profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema;

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema | undefined, action: AnyAction) => StateSchema,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<E> {
    rejectValue: E,
    extra: ThunkExtraArg
}
