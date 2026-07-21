import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { validateProfile } from 'features/EditableProfileCard/model/services/validateProfile/validateProfile';
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string | ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (profileId, thunkApi) => {
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
            const response = await extra.api.put(`/profile/${profileId}`, formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue('API ERROR');
        }
    },
);
