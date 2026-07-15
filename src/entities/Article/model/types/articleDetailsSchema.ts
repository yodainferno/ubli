import { Article } from 'entities/Article';
import { ApiResponse } from 'shared/api/types/apiResponse';

export interface ArticleDetailsSchema {
    data?: ApiResponse<Article, string>;
}
