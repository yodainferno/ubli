import { StateSchema } from 'app/providers/StoreProvider';
import { ResponseStatus } from 'shared/api/types/apiResponse';

export const getArticlesLoading = (state: StateSchema) => {
    const type = state.articlesPage?.data?.type ?? ResponseStatus.IDLE;
    return (type === ResponseStatus.LOADING || type === ResponseStatus.IDLE);
};
export const getArticlesView = (state: StateSchema) => state.articlesPage?.view;
