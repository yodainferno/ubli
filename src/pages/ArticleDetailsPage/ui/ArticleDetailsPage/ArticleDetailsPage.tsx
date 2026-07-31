import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Article, ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Comment, CommentList } from 'entities/Comment';
import { ApiResponse, createSuccess, ResponseStatus } from 'shared/api/types/apiResponse';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/AddNewComment';
import { Page } from 'widgets/Page';
import { getArticleRecommendations } from 'pages/ArticleDetailsPage/model/slices/articleDetailsRecommendationsSlice';
import { getArticleRecommendationsData } from 'pages/ArticleDetailsPage/model/selectors/recommendations';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import {
    fetchRecommendationsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchRecommendationsByArticleId/fetchRecommendationsByArticleId';
import { articleDetailsPageReducer } from '../../model/slices';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsData } from '../../model/selectors/comments';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');

    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchRecommendationsByArticleId());
    });

    const comments = useSelector(getArticleComments.selectAll);
    const commentsData = useSelector(getArticleCommentsData);

    let commentsList: ApiResponse<Comment[], string>;
    if (commentsData?.type === ResponseStatus.SUCCESS) {
        commentsList = createSuccess(comments);
    } else {
        commentsList = commentsData!;
    }

    const onSendComment = useCallback((value: string | undefined) => {
        dispatch(addCommentForArticle(value));
    }, [dispatch]);

    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsData = useSelector(getArticleRecommendationsData);

    let recommendationsList: ApiResponse<Article[], string>;
    if (recommendationsData?.type === ResponseStatus.SUCCESS) {
        recommendationsList = createSuccess(recommendations);
    } else {
        recommendationsList = recommendationsData!;
    }

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('notFound')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text size={TextSize.L} title={t('Рекомендуем')} />
                <ArticleList
                    articles={
                        recommendationsList.type === ResponseStatus.SUCCESS
                            ? recommendationsList.payload!
                            : []
                    }
                    isLoading={
                        recommendationsList.type === ResponseStatus.LOADING
                        || recommendationsList.type === ResponseStatus.IDLE
                    }
                    className={cls.recs}
                />

                <Text size={TextSize.L} title={t('Комментарии')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    className={cls.commentList}
                    commentsList={commentsList}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
