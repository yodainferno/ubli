export enum ResponseStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success',
}

type BaseApiResponse<T extends ResponseStatus> = { type: T }

export type IdleStatus = BaseApiResponse<ResponseStatus.IDLE>
export type SuccessStatus<T = unknown> = BaseApiResponse<ResponseStatus.SUCCESS> & { payload?: T }
export type ErrorStatus<E = unknown> = BaseApiResponse<ResponseStatus.ERROR> & { error?: E }
export type LoadingStatus = BaseApiResponse<ResponseStatus.LOADING>

export type ApiResponse<T = unknown, E = unknown> =
    IdleStatus |
    LoadingStatus |
    SuccessStatus<T> |
    ErrorStatus<E>;

export const createIdle = (): IdleStatus => ({
    type: ResponseStatus.IDLE,
});

export const createLoading = (): LoadingStatus => ({
    type: ResponseStatus.LOADING,
});
export const createError = <E>(e: E): ErrorStatus<E> => ({
    type: ResponseStatus.ERROR,
    error: e,
});
export const createSuccess = <T>(payload: T): SuccessStatus<T> => ({
    type: ResponseStatus.SUCCESS,
    payload,
});
