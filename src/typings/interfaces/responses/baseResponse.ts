export interface baseResponse<T> {
  body: T | null;
  message: string;
}
export interface baseResponseArray<T> {
  body: T[] | null;
  message: string;
}
