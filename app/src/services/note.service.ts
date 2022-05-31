import Note from '@/types/Note';
import NoteClientInterface from '@/types/NoteClientInterface';
import RealtimeCallbacks from '@/types/RealtimeCallbacks';
import supabase from '@/clients/supabase';

class NoteService {
  constructor(protected client: NoteClientInterface) {}

  public async getNotes(): Promise<Note[]> {
    return await this.client.getNotes();
  }

  public async addNote(note: Note): Promise<Note> {
    return await this.client.addNote(note);
  }

  public async updateNote(note: Note): Promise<Note> {
    return await this.client.updateNote(note);
  }

  public async removeNote(note: Note): Promise<void> {
    return await this.client.removeNote(note);
  }

  public subscribeRealtime(callbacks: RealtimeCallbacks) {
    this.client.subscribeRealtime(callbacks);
  }
}

export default new NoteService(supabase);
