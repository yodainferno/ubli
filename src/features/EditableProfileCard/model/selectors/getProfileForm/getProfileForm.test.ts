import { StateSchema } from 'app/providers/StoreProvider';
import { createIdle } from 'shared/api/types/apiResponse';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from './getProfileForm';

const formData: Profile = {
    username: '123',
    firstname: 'John',
    lastname: 'Doe',
    age: 42,
    country: Country.Armenia,
    currency: Currency.EUR,
    city: 'San Francisco',
};

describe('getProfileForm.test', () => {
    test('happy path', () => {
        const value = getProfileForm({
            profile: {
                data: createIdle(),
                form: formData,
            },
        } as StateSchema);

        expect(value).toBe(formData);
    });

    test('undefined path', () => {
        const value = getProfileForm({
            profile: {
                data: createIdle(),
            },
        } as StateSchema);

        expect(value).toBe(undefined);
    });
});
