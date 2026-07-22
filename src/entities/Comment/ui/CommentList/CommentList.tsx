import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ApiResponse, ResponseStatus } from 'shared/api/types/apiResponse';
import { CommentCard } from 'entities/Comment/ui/CommentCard/CommentCard';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';

const skeletonKeys = ['comment-skeleton-1', 'comment-skeleton-2', 'comment-skeleton-3'];

interface CommentListProps {
    className?: string;
    commentsList: ApiResponse<Comment[], string>
}

export const CommentList = memo(({ className, commentsList }: CommentListProps) => {
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
        content = (
            skeletonKeys.map((key) => (
                <CommentCard isLoading key={key} />
            ))
        );
    } else if (commentsList.type === ResponseStatus.SUCCESS) {
        content = (
            commentsList.payload!.map((comment) => (
                <CommentCard comment={comment} key={comment.id} />
            ))
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>{content}</div>
    );
});
