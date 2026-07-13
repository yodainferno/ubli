import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile';

export const getProfileValidateErrors = (
    state: StateSchema,
): ValidateProfileError[] => state.profile?.validateErrors ?? [];
