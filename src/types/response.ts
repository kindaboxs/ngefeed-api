export interface ErrorResponse {
  success: false;
  message: string;
  stack?: string;
}

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? object : { data: T });

export type PaginatedResponse<T> = {
  pagination: {
    page: number;
    totalPages: number;
  };
  data: T;
} & Omit<SuccessResponse, 'data'>;

export interface Post {
  id: number;
  title: string;
  url: string | null;
  content: string | null;
  points: number;
  commentCount: number;
  author: {
    id: string;
    username: string | null;
  };
  isUpvoted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
