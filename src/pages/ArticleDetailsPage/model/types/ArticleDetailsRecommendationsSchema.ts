import { ApiResponse } from 'shared/api/types/apiResponse';
import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
    data: ApiResponse<null, string>
}
