import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { createSuccess, ResponseStatus, SuccessStatus } from 'shared/api/types/apiResponse';
import { getArticleDetailsData } from './articleDetails';
import { Article } from '../types/article';

describe('articleDetails.test', () => {
    test('should return data', () => {
        const data = {
            id: '1',
            title: 'subtitle',
        };
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: createSuccess(data as Article),
            },
        };

        const result = getArticleDetailsData(state as StateSchema);
        expect(result.type).toEqual(ResponseStatus.SUCCESS);
        expect((result as SuccessStatus).payload).toEqual(data);
    });
    test('should work with empty state data', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema).type).toEqual(ResponseStatus.IDLE);
    });
});
