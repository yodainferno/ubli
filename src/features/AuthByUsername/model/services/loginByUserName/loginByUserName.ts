import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE } from 'shared/consts/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginByUserNameProps {
    username: string
    password: string
}

// это action creator
export const loginByUserName = createAsyncThunk<
    User,
    LoginByUserNameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
        } = thunkApi;

        try {
            const response = await extra.api.post('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE, JSON.stringify(response.data)); // сохранили для логина
            dispatch(userActions.setAuthData(response.data)); // обновили данные user

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
