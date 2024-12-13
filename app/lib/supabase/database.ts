import { supabase } from './config';
import { PostgrestError } from '@supabase/supabase-js';

export async function fetchData<T>(
  table: string,
  query: {
    select?: string;
    eq?: Record<string, any>;
    order?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  let queryBuilder = supabase
    .from(table)
    .select(query.select || '*');

  if (query.eq) {
    Object.entries(query.eq).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }

  if (query.order) {
    queryBuilder = queryBuilder.order(
      query.order.column,
      { ascending: query.order.ascending ?? true }
    );
  }

  if (query.limit) {
    queryBuilder = queryBuilder.limit(query.limit);
  }

  const { data, error } = await queryBuilder;

  if (error) throw error;
  return data as T[];
}

export async function insertData<T>(
  table: string,
  data: Partial<T>
): Promise<T> {
  const { data: insertedData, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return insertedData as T;
}

export async function updateData<T>(
  table: string,
  id: string | number,
  data: Partial<T>
): Promise<T> {
  const { data: updatedData, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return updatedData as T;
}

export async function deleteData(
  table: string,
  id: string | number
): Promise<void> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) throw error;
}