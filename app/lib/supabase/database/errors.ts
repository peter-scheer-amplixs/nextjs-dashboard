export class DatabaseOperationError extends Error {
  constructor(
    message: string,
    public operation: 'fetch' | 'insert' | 'update' | 'delete',
    public table: string
  ) {
    super(message);
    this.name = 'DatabaseOperationError';
  }
}