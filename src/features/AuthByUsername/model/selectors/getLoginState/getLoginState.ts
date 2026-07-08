import { StateSchema } from 'app/providers/StoreProvider';
import { createIdle } from 'shared/api/types/apiResponse';

export const getLoginState = (state: StateSchema) => state.loginForm ?? {
    username: '',
    password: '',
    status: createIdle(),
};
