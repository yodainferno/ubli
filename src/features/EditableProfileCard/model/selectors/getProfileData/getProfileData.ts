import { StateSchema } from 'app/providers/StoreProvider';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';

export const getProfileData = (state: StateSchema): ApiResponse<Profile, string> | null => {
    if (state.profile?.data) {
        return state.profile.data;
    }
    return null;
};
