import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticlesPageFilter } from './ArticlesPageFilter';

export default {
    title: 'todo/ArticlesPageFilter',
    component: ArticlesPageFilter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPageFilter>;

const Template: ComponentStory<typeof ArticlesPageFilter> = (args) => <ArticlesPageFilter {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [];
