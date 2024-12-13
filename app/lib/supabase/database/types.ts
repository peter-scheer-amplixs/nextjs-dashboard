export interface QueryOptions {
  select?: string;
  eq?: Record<string, any>;
  order?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
  offset?: number;
}

export interface DatabaseError {
  code: string;
  message: string;
  details?: string;
}