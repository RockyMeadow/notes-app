import { ref } from 'vue';
import Note from '@/types/Note';
import noteService from '@/services/note.service';
import { v4 as uuidv4 } from 'uuid';

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

    if (!notes.value[0]?.id) {
      notes.value[0] = emptyNote;
    } else {
      notes.value.unshift(emptyNote);
    }

    currentIndex.value = 0;
  }

  async function fetchNotes() {
    notes.value = await noteService.getNotes();
  }

  async function saveCurrentNote() {
    const currentNote = notes.value[currentIndex.value];
    currentNote.tag = uuidv4();

    const saved = notes.value[currentIndex.value].id
      ? await noteService.updateNote(currentNote)
      : await noteService.addNote(currentNote);

    const index = notes.value.findIndex((note) => note.tag === saved.tag);

    if (index !== currentIndex.value) {
      notes.value[index] = saved;
    } else {
      notes.value[index].id = saved.id;
    }
  }

  function removeCurrentNote() {
    if (currentIndex.value === -1) {
      return;
    }

    if (notes.value[currentIndex.value].id) {
      noteService.removeNote(notes.value[currentIndex.value]);
    }

    notes.value.splice(currentIndex.value, 1);
    currentIndex.value = -1;
  }

  return {
    addNewNote,
    currentIndex,
    fetchNotes,
    notes,
    selectNote,
    saveCurrentNote,
    removeCurrentNote,
  };
}

noteService.subscribeRealtime({
  onNoteAdded,
  onNoteUpdated,
  onNoteRemoved,
});

function onNoteAdded(added: Note) {
  const index = notes.value.findIndex((note) => note.tag === added.tag);

  if (index === -1) {
    notes.value.push(added);
  }
}

function onNoteUpdated(updated: Note) {
  const index = notes.value.findIndex((note) => note.id === updated.id);

  if (index > -1 && notes.value[index].tag !== updated.tag) {
    notes.value[index] = updated;
  }
}

function onNoteRemoved(removed: Note) {
  const index = notes.value.findIndex((note) => note.id === removed.id);

  if (index !== -1) {
    notes.value.splice(index, 1);
  }
}
