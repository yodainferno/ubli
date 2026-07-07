import { StateSchema } from 'app/providers/StoreProvider';
import { createIDLE } from 'shared/api/types/apiResponse';

export const getLoginState = (state: StateSchema) => state.loginForm ?? {
    username: '',
    password: '',
    status: createIDLE(),
};
