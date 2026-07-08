import { ApiResponse } from 'shared/api/types/apiResponse';
import { Country, Currency } from 'shared/consts/common';

export interface Profile {
    first: string,
    lastname: string,
    age: number,
    currency: Currency,
    country: Country,
    city: string,
    username: string,
    avatar: string,
}

export type ProfileSchema = {
    data: ApiResponse<Profile, string>,
}
