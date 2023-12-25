export interface Response<T, K> {
  isSuccess: boolean;
  result: T | null;
  error: K | null;
}
