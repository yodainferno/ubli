import { StateSchema } from 'app/providers/StoreProvider';
import { createSuccess, ResponseStatus, SuccessStatus } from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileData } from './getProfileData';

const profileData: Profile = {
    username: '123',
    firstname: 'John',
    lastname: 'Doe',
    age: 42,
    country: Country.Armenia,
    currency: Currency.EUR,
    city: 'San Francisco',
};

describe('getProfileData.test', () => {
    test('happy path', () => {
        const value = getProfileData({
            profile: {
                data: createSuccess(profileData),
            },
        } as StateSchema);

        expect(!!value).toBe(true);
        expect(value!.type).toEqual(ResponseStatus.SUCCESS);
        expect((value as SuccessStatus).payload).toEqual({ ...profileData });
    });
});
