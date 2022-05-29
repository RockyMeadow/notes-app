import { ref } from 'vue';
import Note from '@/types/Note';
import NoteClientInterface from '@/types/NoteClientInterface';

export default function useNotes(client: NoteClientInterface) {
  const notes = ref<Note[]>([]);

  async function getNotes() {
    notes.value = await client.getNotes();
  }

  async function updateNote(note: Note) {
    const updated = await client.updateNote(note);

    notes.value = [updated, ...notes.value.filter((note) => note.id !== updated.id)];
  }

  async function addNote(note: Note) {
    const added = await client.addNote(note);

    notes.value.unshift(added);
  }

  async function removeNote(toBeDeleted: Note) {
    await client.removeNote(toBeDeleted);

    notes.value = notes.value.filter((note) => note.id !== toBeDeleted.id);
  }

  return { notes, addNote, getNotes, updateNote, removeNote };
}
