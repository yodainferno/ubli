import axios from 'axios';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { createIdle, createLoading, createSuccess } from '../../../../../shared/api/types/apiResponse';
import { ArticleView } from '../../../../../entities/Article';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

const data = {
    page: 1,
    ids: [],
    entities: {},
    limit: 5,
    data: createSuccess(null),
    view: ArticleView.SMALL,
    hasMore: true,
};
describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                ...data,
                page: 2,
            },
        });
        const result = await thunk.calcThunk();
        //
        expect(thunk.dispatch).toHaveBeenCalledTimes(4); // pend + full + 2 dispatch внутри (+1 page и запрос данных)
        expect(fetchArticlesList).toBeCalledWith({ page: 3 });
    });

    test('hasMore', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                ...data,
                hasMore: false,
            },
        });
        const result = await thunk.calcThunk();
        //
        expect(thunk.dispatch).toHaveBeenCalledTimes(2); // pend + full
        expect(fetchArticlesList).toHaveBeenCalledTimes(0);
    });

    test('loading', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                ...data,
                data: createLoading(),
            },
        });
        const result = await thunk.calcThunk();
        //
        expect(thunk.dispatch).toHaveBeenCalledTimes(2); // pend + full
        expect(fetchArticlesList).toHaveBeenCalledTimes(0);
    });
});
