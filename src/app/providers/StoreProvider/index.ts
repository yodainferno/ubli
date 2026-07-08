export { StoreProvider } from './ui/StoreProvider';
export { createReduxStore } from './config/store';
export type {
    StateSchema,
    ReducersList,
    ThunkExtraArg,
    ThunkConfig,
} from 'app/providers/StoreProvider/config/StateSchema'; // тип из вышестоящего - исключение FSD
export { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';
