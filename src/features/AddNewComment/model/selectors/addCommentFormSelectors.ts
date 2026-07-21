import { StateSchema } from 'app/providers/StoreProvider';
import { createIdle } from 'shared/api/types/apiResponse';

export const getAddCommentFormText = (state: StateSchema): string | undefined => state.addCommentForm?.text;
export const getAddCommentFormData = (state: StateSchema) => state.addCommentForm?.data || createIdle();
