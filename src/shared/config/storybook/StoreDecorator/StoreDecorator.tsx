import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

const defaultState: StateSchema = {
    counter: {
        value: 0,
    },
};

export const StoreDecorator = (state: StateSchema = defaultState) => (StoryComponent: Story) => (
    <StoreProvider initialState={state}>
        <StoryComponent />
    </StoreProvider>
);
