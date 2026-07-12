import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/updateProfileData',
    async (authData, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkApi;

        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put('/profile', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
