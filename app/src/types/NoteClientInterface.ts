import Note from './Note';

export default interface NoteClientInterface {
  getNotes: () => Promise<Note[]>;
  addNote: (note: Note) => Promise<Note>;
  updateNote: (note: Note) => Promise<Note>;
  removeNote: (note: Note) => Promise<void>;
}
