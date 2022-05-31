import Note from './Note';

export default interface RealtimeCallbacks {
  onNoteAdded: (note: Note) => any;
  onNoteUpdated: (note: Note) => any;
  onNoteRemoved: (note: Note) => any;
}
