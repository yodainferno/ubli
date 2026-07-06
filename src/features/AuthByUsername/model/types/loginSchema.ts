import { ApiResponse } from 'shared/api/types/apiResponse';

export interface LoginSchema {
    username: string;
    password: string;
    status: ApiResponse<unknown, string>
}
