import { ref } from 'vue';
import Note from '@/types/Note';
import client from '@/clients/supabase';

const notes = ref<Note[]>([]);
const currentIndex = ref(-1);

export default function useNotes() {
  function selectNote(note: Note) {
    currentIndex.value = notes.value.findIndex((n) => n.id === note.id);
  }

  function addNewNote() {
    const emptyNote: Note = {
      title: '',
      content: '',
      inserted_at: new Date().toISOString(),
    };

    if (!notes.value[0].id) {
      notes.value[0] = emptyNote;
    } else {
      notes.value.unshift(emptyNote);
    }

    currentIndex.value = 0;
  }

  async function getNotes() {
    notes.value = await client.getNotes();
  }

  async function updateNote(note: Note) {
    const updated = await client.updateNote(note);
    const index = notes.value.findIndex((note) => note.id === updated.id);

    if (index > -1) {
      notes.value[index] = updated;
    }
  }

  async function addNote(note: Note) {
    const added = await client.addNote(note);
    const index = notes.value.findIndex((note) => !note.id);

    if (index > -1) {
      notes.value[index] = added;
    }
  }

  function removeCurrentNote() {
    if (currentIndex.value === -1) {
      return;
    }

    if (notes.value[currentIndex.value].id) {
      client.removeNote(notes.value[currentIndex.value]);
    }

    notes.value.splice(currentIndex.value, 1);
    currentIndex.value = -1;
  }

  return { notes, addNote, addNewNote, currentIndex, getNotes, selectNote, updateNote, removeCurrentNote };
}
