import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { DeepPartial } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { ReducersList, StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: ReducersList;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    const navigate = useNavigate();

    const store = createReduxStore(
        navigate,
        initialState as StateSchema,
        asyncReducers,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
