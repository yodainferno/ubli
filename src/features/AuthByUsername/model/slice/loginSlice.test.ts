import { DeepPartial } from '@reduxjs/toolkit';
import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/loginSchema';

describe('loginSlice.test', () => {
    test('setUsername', () => {
        const state: DeepPartial<LoginSchema> = { username: '111' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUsername('aaa'),
        )).toEqual({ username: 'aaa' });
    });

    test('setPassword', () => {
        const state: DeepPartial<LoginSchema> = { password: '111' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('aaa'),
        )).toEqual({ password: 'aaa' });
    });
});
