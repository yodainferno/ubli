import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReducersList } from 'app/providers/StoreProvider';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { ResponseStatus } from 'shared/api/types/apiResponse';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}
const initialReducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};
export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    const articleData = useSelector(getArticleDetailsData);

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (true || articleData.type === ResponseStatus.LOADING || articleData.type === ResponseStatus.IDLE) {
        content = (
            <div>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />

            </div>
        );
    } else if (articleData.type === ResponseStatus.ERROR) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('error')}
            />
        );
    } else if (articleData.type === ResponseStatus.SUCCESS) {
        content = (
            <div>
                success
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={initialReducers} keepAfterUnmount={false}>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
