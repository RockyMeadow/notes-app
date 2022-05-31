import Note from './Note';
import RealtimeCallbacks from './RealtimeCallbacks';

export default interface NoteClientInterface {
  getNotes: () => Promise<Note[]>;
  addNote: (note: Note) => Promise<Note>;
  updateNote: (note: Note) => Promise<Note>;
  removeNote: (note: Note) => Promise<void>;
  subscribeRealtime: (callbacks: RealtimeCallbacks) => void;
}
