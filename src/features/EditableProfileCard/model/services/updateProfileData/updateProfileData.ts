import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { validateProfile } from 'features/EditableProfileCard/model/services/validateProfile/validateProfile';
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string | ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (authData, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkApi;

        const formData = getProfileForm(getState());
        const errors = validateProfile(formData);

        if (errors.length > 0) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put('/profile', formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue('API ERROR');
        }
    },
);
