import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article/model/types/article';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    //
    sort: ArticleSortField;
    onChangeSort: (sort: ArticleSortField) => void;
    //
    order: SortOrder;
    onChangeOrder: (order: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        //
        sort,
        onChangeSort,
        //
        order,
        onChangeOrder,
    } = props;

    const { t } = useTranslation();

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: 'дате публикации',
        },
        {
            value: ArticleSortField.TITLE,
            content: 'названию',
        },
        {
            value: ArticleSortField.VIEWS,
            content: 'просмотрам',
        },
    ], []);
    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: 'возрастанию',
        },
        {
            value: 'desc',
            content: 'убыванию',
        },
    ], []);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
                label="Сортировать по"
            />
            <Select<SortOrder>
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                label="по"
            />
        </div>
    );
});
