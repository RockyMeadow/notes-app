import Note from '@/types/Note';
import NoteClientInterface from '@/types/NoteClientInterface';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

class SupabaseNoteClient implements NoteClientInterface {
  public async getNotes(): Promise<Note[]> {
    return await supabase
      .from('notes')
      .select('*')
      .order('id')
      .then((response) => response.data as Note[]);
  }

  public async addNote(note: Note): Promise<Note> {
    return await supabase
      .from('notes')
      .insert(note)
      .single()
      .then((response) => response.data as Note);
  }

  public async updateNote(note: Note): Promise<Note> {
    return await supabase
      .from('notes')
      .update({ ...note })
      .eq('id', note.id)
      .single()
      .then((response) => response.data as Note);
  }

  public async removeNote(note: Note): Promise<void> {
    return await supabase
      .from('notes')
      .delete()
      .eq('id', note.id)
      .then(() => undefined);
  }
}

export default new SupabaseNoteClient();
