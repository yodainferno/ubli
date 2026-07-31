import { ApiResponse } from 'shared/api/types/apiResponse';
import { Article, ArticleView } from 'entities/Article';
import { EntityState } from '@reduxjs/toolkit';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    // data
    data: ApiResponse<null, string>;
    _inited: boolean;

    // ui
    view: ArticleView,

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    order: SortOrder
    sort: ArticleSortField,
    search: string;
    type: ArticleType;
}
