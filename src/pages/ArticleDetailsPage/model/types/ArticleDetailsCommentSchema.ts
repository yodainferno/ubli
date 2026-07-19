import { ApiResponse } from 'shared/api/types/apiResponse';
import { Comment } from 'entities/Comment';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsCommentSchema extends EntityState<Comment> {
    data: ApiResponse<null, string>
}
