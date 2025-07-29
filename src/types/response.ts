export interface ErrorResponse {
  success: false;
  message: string;
  stack?: string;
}

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? object : { data: T });
