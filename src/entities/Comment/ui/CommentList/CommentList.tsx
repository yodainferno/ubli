import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ApiResponse, ResponseStatus } from 'shared/api/types/apiResponse';
import { CommentCard } from 'entities/Comment/ui/CommentCard/CommentCard';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    commentsList: ApiResponse<Comment[], string>
}

export const CommentList = memo(({ className, commentsList }: CommentListProps) => {
    const { t } = useTranslation();

    let content;
    if (commentsList.type === ResponseStatus.ERROR) {
        content = (
            <div className={classNames(cls.CommentList, {}, [className])}>
                {commentsList.error}
            </div>
        );
    } else if (commentsList.type === ResponseStatus.IDLE) {
        content = (
            <div className={classNames(cls.CommentList, {}, [className])} />
        );
    } else if (commentsList.type === ResponseStatus.LOADING) {
        const skeletonLoadingItems = 3;
        content = (
            Array.from({ length: skeletonLoadingItems }).map(() => (
                <CommentCard isLoading />
            ))
        );
    } else if (commentsList.type === ResponseStatus.SUCCESS) {
        content = (
            commentsList.payload!.map((comment) => (
                <CommentCard comment={comment} />
            ))
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>{content}</div>
    );
});
