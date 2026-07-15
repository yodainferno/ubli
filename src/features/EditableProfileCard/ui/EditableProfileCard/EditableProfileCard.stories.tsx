import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import {
    createError, createIdle, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/profile';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

export default {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

const profileData: Profile = {
    username: '123',
    firstname: 'John',
    lastname: 'Doe',
    age: 42,
    country: Country.Armenia,
    currency: Currency.EUR,
    city: 'San Francisco',
};

export const Success = Template.bind({});
Success.decorators = [StoreDecorator({
    profile: {
        data: createSuccess(profileData),
    },
})];

export const SuccessEditing = Template.bind({});
SuccessEditing.decorators = [StoreDecorator({
    profile: {
        data: createSuccess(profileData),
        form: {
            ...profileData,
            lastname: 'TEEEEST',
            firstname: undefined,
        },
        readonly: false,
    },
})];

export const SuccessEditingValidationErrors = Template.bind({});
SuccessEditingValidationErrors.decorators = [StoreDecorator({
    profile: {
        data: createSuccess(profileData),
        form: {
            ...profileData,
            age: -123,
            firstname: undefined,
            username: undefined,
        },
        readonly: false,
        validateErrors: [
            ValidateProfileError.INCORRECT_AUTH_DATA,
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ],
    },
})];

export const ValidateErrorsAndSuccess = Template.bind({});
ValidateErrorsAndSuccess.decorators = [StoreDecorator({
    profile: {
        data: createSuccess(profileData),
        readonly: true,
        validateErrors: [
            ValidateProfileError.INCORRECT_AUTH_DATA,
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ],
    },
})];

export const ValidateErrorsAndLoading = Template.bind({});
ValidateErrorsAndLoading.decorators = [StoreDecorator({
    profile: {
        data: createLoading(),
        readonly: true,
        validateErrors: [
            ValidateProfileError.INCORRECT_AUTH_DATA,
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ],
    },
})];

export const ValidateErrorsAndError = Template.bind({});
ValidateErrorsAndError.decorators = [StoreDecorator({
    profile: {
        data: createError('error'),
        readonly: true,
        validateErrors: [
            ValidateProfileError.INCORRECT_AUTH_DATA,
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ],
    },
})];

export const Idle = Template.bind({});
Idle.decorators = [StoreDecorator({
    profile: {
        data: createIdle(),
    },
})];

export const Loading = Template.bind({});
Loading.decorators = [StoreDecorator({
    profile: {
        data: createLoading(),
    },
})];

export const Error = Template.bind({});
Error.decorators = [StoreDecorator({
    profile: {
        data: createError('some error'),
    },
})];
