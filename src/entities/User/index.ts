export {
    userReducer,
    userActions,
} from './model/slice/userSlice';

// export { Counter } from './ui/Counter';

export type {
    User,
    UserSchema,
} from './model/types/user';

export { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';
