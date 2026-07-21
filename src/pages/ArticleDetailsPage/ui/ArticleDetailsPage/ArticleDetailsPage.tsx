import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { Comment, CommentList } from 'entities/Comment';
import { ApiResponse, createSuccess, ResponseStatus } from 'shared/api/types/apiResponse';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/AddNewComment';
import { addCommentForArticle }
    from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsData } from '../../model/selectors/comments';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentReducer, getArticleComments } from '../../model/slices/articleDetailsCommentSlice';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComment: articleDetailsCommentReducer,
};
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');

    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

    const comments = useSelector(getArticleComments.selectAll);
    const data = useSelector(getArticleCommentsData);

    let commentsList: ApiResponse<Comment[], string>;
    if (data?.type === ResponseStatus.SUCCESS) {
        commentsList = createSuccess(comments);
    } else {
        commentsList = data!;
    }

    const onSendComment = useCallback((value: string | undefined) => {
        dispatch(addCommentForArticle(value));
    }, [dispatch]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('notFound')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text title={t('Комментарии')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    className={cls.commentList}
                    commentsList={commentsList}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
