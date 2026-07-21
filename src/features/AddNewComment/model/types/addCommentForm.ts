import { ApiResponse } from 'shared/api/types/apiResponse';

export interface AddCommentFormSchema {
    text?: string;
    data: ApiResponse<null, string>;
}
