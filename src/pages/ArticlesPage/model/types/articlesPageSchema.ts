import { ApiResponse } from 'shared/api/types/apiResponse';
import { Article, ArticleView } from 'entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticlesPageSchema extends EntityState<Article> {
    data: ApiResponse<null, string>;
    view: ArticleView

    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;
}
