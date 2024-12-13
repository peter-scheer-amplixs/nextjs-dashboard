import { supabase } from '../config/client';
import { QueryOptions } from './types';
import { DatabaseOperationError } from './errors';

export class DatabaseService {
  static async fetch<T>(table: string, options: QueryOptions = {}): Promise<T[]> {
    try {
      let query = supabase.from(table).select(options.select || '*');

      if (options.eq) {
        Object.entries(options.eq).forEach(([column, value]) => {
          query = query.eq(column, value);
        });
      }

      if (options.order) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending ?? true
        });
      }

      if (options.limit) query = query.limit(options.limit);
      if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 10) - 1);

      const { data, error } = await query;
      
      if (error) throw new DatabaseOperationError(error.message, 'fetch', table);
      return data as T[];
    } catch (error) {
      if (error instanceof DatabaseOperationError) throw error;
      throw new DatabaseOperationError(
        'Failed to fetch data',
        'fetch',
        table
      );
    }
  }

  static async insert<T>(table: string, data: Partial<T>): Promise<T> {
    try {
      const { data: inserted, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) throw new DatabaseOperationError(error.message, 'insert', table);
      return inserted as T;
    } catch (error) {
      if (error instanceof DatabaseOperationError) throw error;
      throw new DatabaseOperationError(
        'Failed to insert data',
        'insert',
        table
      );
    }
  }

  static async update<T>(
    table: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T> {
    try {
      const { data: updated, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new DatabaseOperationError(error.message, 'update', table);
      return updated as T;
    } catch (error) {
      if (error instanceof DatabaseOperationError) throw error;
      throw new DatabaseOperationError(
        'Failed to update data',
        'update',
        table
      );
    }
  }

  static async delete(table: string, id: string | number): Promise<void> {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw new DatabaseOperationError(error.message, 'delete', table);
    } catch (error) {
      if (error instanceof DatabaseOperationError) throw error;
      throw new DatabaseOperationError(
        'Failed to delete data',
        'delete',
        table
      );
    }
  }
}