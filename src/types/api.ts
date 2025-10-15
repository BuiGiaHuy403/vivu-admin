
export interface ApiResponse<T = unknown> {
  succeeded: boolean;
  message?: string;
  status?: number;
  data?: T;
}