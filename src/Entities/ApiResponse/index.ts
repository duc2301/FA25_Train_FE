export interface ApiResponse<T> {
    message: string;
    isSuccess: boolean;
    result: T;
}