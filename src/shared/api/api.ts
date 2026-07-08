import axios from 'axios';
import { USER_LOCALSTORAGE } from 'shared/consts/localstorage';

const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.com';

export const $api = axios.create({
    baseURL,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE)?.toString() ?? '',
    },
});
