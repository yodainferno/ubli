export type ScrollSchema = Record<string, number>; // адрес страницы, позиция скролла

export interface PageSchema {
    scroll: ScrollSchema
}
