import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileCard } from './ProfileCard';
import { Profile } from '../../model/types/profile';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

const profileData: Profile = {
    username: '123',
    firstname: 'John',
    lastname: 'Doe',
    age: 42,
    country: Country.Armenia,
    currency: Currency.EUR,
    city: 'San Francisco',
};

export const Readonly = Template.bind({});
Readonly.args = {
    data: profileData,
    readOnly: true,
};

export const ReadonlyDark = Template.bind({});
ReadonlyDark.args = {
    data: profileData,
    readOnly: true,
};
ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Editable = Template.bind({});
Editable.args = {
    data: profileData,
    readOnly: false,
};

export const EditableDark = Template.bind({});
EditableDark.args = {
    data: profileData,
    readOnly: false,
};
EditableDark.decorators = [ThemeDecorator(Theme.DARK)];
