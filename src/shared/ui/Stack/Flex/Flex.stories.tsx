import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => (
    <div style={{ height: 200, backgroundColor: '#ccf' }}>
        <Flex {...args} />
    </div>
);

const items = (
    <>
        <div>A1</div>
        <div>A2</div>
        <div style={{ height: 100, width: 100, background: 'red' }}>A3</div>
    </>
);

export const Row = Template.bind({});
Row.args = {
    children: items,
};
Row.decorators = [];

//
export const RowGap4 = Template.bind({});
RowGap4.args = {
    children: items,
    gap: '4',
};
RowGap4.decorators = [];

//

export const RowGap8 = Template.bind({});
RowGap8.args = {
    children: items,
    gap: '8',
};
RowGap8.decorators = [];

//
export const RowGap16 = Template.bind({});
RowGap16.args = {
    children: items,
    gap: '16',
};
RowGap16.decorators = [];

//
export const RowGap32 = Template.bind({});
RowGap32.args = {
    children: items,
    gap: '32',
};
RowGap32.decorators = [];

//
export const Column = Template.bind({});
Column.args = {
    children: items,
    direction: 'column',
};
Column.decorators = [];

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
    children: items,
    direction: 'column',
    gap: '16',
};
ColumnGap16.decorators = [];
