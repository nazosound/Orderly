export interface EndResultInterface<T> {
  result: boolean;
  message: string;
  data: T;
  statusCode: number;
}
