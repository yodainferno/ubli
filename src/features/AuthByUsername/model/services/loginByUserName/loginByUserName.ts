import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE } from 'shared/consts/localstorage';

interface LoginByUserNameProps {
    username: string
    password: string
}

// это action creator
export const loginByUserName = createAsyncThunk<
    User,
    LoginByUserNameProps,
    {
        rejectValue: string
    }
>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8000/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE, JSON.stringify(response.data)); // сохранили для логина
            thunkAPI.dispatch(userActions.setAuthData(response.data)); // обновили данные user

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);
