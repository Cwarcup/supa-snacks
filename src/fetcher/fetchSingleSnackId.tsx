import supabase from '../config/supabaseClient';
import { SnackType } from '../types/snackType';

async function fetchSingleSnackId(id: string | undefined): Promise<SnackType> {
  const { data, error } = await supabase
    .from('snacks') // table
    .select() // select all columns
    .eq('id', id) // where id = id
    .single(); // only return one row

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default fetchSingleSnackId;
