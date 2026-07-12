import { StateSchema } from 'app/providers/StoreProvider';
import { ApiResponse, createIdle } from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';

export const getProfileData = (state: StateSchema): ApiResponse<Profile, string> => {
    if (state.profile?.data) {
        return state.profile.data;
    }
    return createIdle();
};
