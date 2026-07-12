import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvatarIgm from './storybook.jpg';

import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
Small.args = {
    size: 50,
    src: AvatarIgm,
};

export const Large = Template.bind({});
Large.args = {
    size: 100,
    src: AvatarIgm,
};
