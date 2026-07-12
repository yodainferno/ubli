import { ApiResponse } from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';

export type ProfileSchema = {
    data: ApiResponse<Profile, string>,
    form?: Profile,
    readonly: boolean
}
