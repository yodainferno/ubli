import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileReadOnly = (state: StateSchema): boolean => state.profile?.readonly ?? false;
