import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useDispatch, useStore } from 'react-redux';
import type { ReducersList, ReduxStoreWithManager } from 'app/providers/StoreProvider';
import type { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import type { Reducer } from '@reduxjs/toolkit';

export type { ReducersList };

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList,
    keepAfterUnmount?: boolean,
    children: ReactNode,
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {
        children,
        reducers,
        keepAfterUnmount = false,
    } = props;

    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        const reducerEntries = Object.entries(reducers) as ReducersListEntry[];

        reducerEntries.forEach(([name, reducer]) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (!keepAfterUnmount) {
                reducerEntries.forEach(([name]) => {
                    store.reducerManager.remove(name);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
